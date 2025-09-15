import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import modbus from "jsmodbus";
import fs from "fs";
import net from "net";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ใช้เพื่อดึง __dirname ใน ESM module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// เช็คว่าอยู่ใน dev หรือ production
const isDev = process.env.NODE_ENV === "development" || !process.defaultApp;

// กำหนด path ไปยังไฟล์ JSON
const DATA_FILE = isDev
  ? path.join(__dirname, "/config/points.json") // ใน dev
  : path.join(process.resourcesPath, "app", "server", "config", "points.json"); // ใน build

let wsClients = [];

const startWsServer = (port) => {
  const wss = new WebSocketServer({ port });

  console.log(`✅ WS server running on ws://localhost:${port}`);

  wss.on("connection", (ws) => {
    console.log("🔌 Client connected");

    const clientSocket = {
      id: uuidv4(),
      socket: ws,
    };
    wsClients.push(clientSocket);

    ws.on("message", async (message) => {
      try {
        const { cmd, param, session } = JSON.parse(message);

        if (cmd === "setTime") {
          const config = JSON.parse(await readFile(DATA_FILE, "utf8"));
          const currentDate = new Date();
          const dayOfWeek = currentDate.getDay();
          const adjustedDayOfWeek = dayOfWeek === 0 ? 1 : dayOfWeek + 1;

          const values = [
            adjustedDayOfWeek,
            currentDate.getDate(),
            currentDate.getMonth() + 1,
            currentDate.getFullYear() % 100,
            currentDate.getHours(),
            currentDate.getMinutes(),
            currentDate.getSeconds(),
          ];

          console.log("🕒 Initializing time writes to all zones...");

          for (const zone of config.zone) {
            const { ip, port } = zone;
            const socket = new net.Socket();
            const client = new modbus.client.TCP(socket);

            try {
              await new Promise((resolve, reject) => {
                socket.connect({ host: ip, port }, async () => {
                  try {
                    const buf = Buffer.alloc(values.length * 2);
                    values.forEach((val, i) => buf.writeUInt16BE(val, i * 2));

                    await client.writeMultipleRegisters(169, buf);
                    console.log(`✅ Successfully wrote time to ${ip}:${port}`);
                    resolve();
                  } catch (err) {
                    reject(`❌ Write error: ${err.message}`);
                  } finally {
                    socket.destroy();
                  }
                });

                socket.on("error", (err) => {
                  reject(`❌ Connection error: ${err.message}`);
                });
              });
            } catch (err) {
              console.error(
                `⚠️ Failed to update time for ${ip}:${port} - ${err}`
              );
            }
          }
        }

        if (cmd === "getPoints") {
          fs.readFile(DATA_FILE, "utf8", (err, data) => {
            if (err) {
              console.error("❌ Read file error:", err);
              return ws.send(
                JSON.stringify({
                  type: "getPoints",
                  error: "Read failed",
                  session: session,
                })
              );
            }
            try {
              const json = JSON.parse(data || '{ "zone": [] }');
              let info =
                json.zone?.[param.zoneInt]?.pages?.[param.pageInt].info || [];
              info = info.map((arr) =>
                Array.isArray(arr)
                  ? arr.sort((a, b) => a.address - b.address)
                  : arr
              );
              // console.log(info);
              ws.send(
                JSON.stringify({ type: "getPoints", info, session: session })
              );
            } catch (parseErr) {
              console.error("❌ JSON parse error:", parseErr);
              ws.send(
                JSON.stringify({
                  type: "getPoints",
                  error: "Invalid JSON format",
                  session: session,
                })
              );
            }
          });
          return;
        }

        const data = param;
        
        console.log(
          `[${new Date().toLocaleString()}] param:`,
          data,
          "session:",
          session
        );

        const { ip, port, address, type, countValue, values } = data;

        if (!ip || !port == null) {
          return ws.send(
            JSON.stringify({
              type: "TCP",
              error: "❌ Missing ip, port, or address",
              session: session,
            })
          );
        }

        const socket = new net.Socket();
        const client = new modbus.client.TCP(socket);

        socket.connect({ host: ip, port }, async () => {
          try {
            if (cmd === "read") {
              if (!countValue) {
                return ws.send(
                  JSON.stringify({
                    type: "TCP",
                    error: "❌ Missing countValue for read",
                    session: session,
                  })
                );
              }

              try {
                const { response } = await client.readHoldingRegisters(
                  address,
                  countValue
                );
                const values = response._body._valuesAsArray;
                const buffer = response._body._valuesAsBuffer.toString("hex");
                // console.log("✅ Read success:", values);
                ws.send(
                  JSON.stringify({
                    type: "read",
                    ip,
                    values,
                    buffer,
                    session: session,
                  })
                );
              } catch (err) {
                console.error("❌ Read failed:", err);
                ws.send(
                  JSON.stringify({
                    type: "TCP",
                    error: err.message || "Read failed",
                    session: session,
                  })
                );
              }
            }

            if (cmd === "write") {
              if (!Array.isArray(values)) {
                return ws.send(
                  JSON.stringify({
                    type: "TCP",
                    error: "❌ Invalid values for write",
                    session: session,
                  })
                );
              }

              const buf = Buffer.alloc(values.length * 2);
              values.forEach((val, i) => buf.writeUInt16BE(val, i * 2));

              try {
                await client.writeMultipleRegisters(address, buf);
                console.log("✅ Write success:", values);
                ws.send(
                  JSON.stringify({
                    type: "write",
                    status: "success",
                    ip,
                    address,
                    values,
                    session: session,
                  })
                );
              } catch (err) {
                console.error("❌ Write failed:", err);
                ws.send(
                  JSON.stringify({
                    type: "TCP",
                    error: err.message || "Write failed",
                    session: session,
                  })
                );
              }
            }
          } finally {
            socket.destroy();
          }
        });

        socket.on("error", (err) => {
          console.error("❌ Socket error:", err.message);
          ws.send(
            JSON.stringify({
              type: "TCP",
              error: `❌ TCP connection error: ${err.message}`,
              session: session,
            })
          );
        });
      } catch (err) {
        console.error("❌ Invalid message:", err.message);
        ws.send(
          JSON.stringify({
            type: "TCP",
            error: "Invalid message format",
          })
        );
      }
    });

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      wsClients = wsClients.filter((client) => client.socket !== ws);
    });
  });
};

export { startWsServer, wsClients };
