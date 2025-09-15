import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';
import { startWsServer } from './wsServer.js';
import net from 'net';
import modbus from 'jsmodbus'; 
import cors from 'cors';
import { readFile } from 'fs/promises';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import presetValueRouter from './routes/presetValue.route.js';
import timePresetValueRouter from './routes/timePresetValue.route.js';
import {ZoneTimeNameRouter, ZonePresetNameRouter , CreateZone, EditZone, DeleteZone} from './routes/config.routes.js';
import mapRouter from './routes/map.route.js';

dotenv.config();

import { PORT, HOST } from './config/env.js';

const app = express();
app.use(express.json());
app.use(cors());



app.use('/presetValue', presetValueRouter);
app.use('/timePresetValue', timePresetValueRouter);
app.use('/ZoneTimeName', ZoneTimeNameRouter);
app.use('/ZonePresetName', ZonePresetNameRouter);
app.use('/CreateZone', CreateZone);
app.use('/EditZone', EditZone);
app.use('/DeleteZone', DeleteZone);
app.use('/mapRouter', mapRouter);


app.get("/", (req, res) => {
  res.json({ message: "Hello from HTTP!" });
});

app.post("/write", async (req, res) => {
  const { ip, port, address, values } = req.body;

  if (!ip || !port || typeof address !== "number" || !Array.isArray(values)) {
    return res.status(400).json({
      error: "❌ Missing or invalid ip, port, address, or values",
    });
  }

  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket);

  try {
    await new Promise((resolve, reject) => {
      socket.connect({ host: ip, port }, async () => {
        try {
          const buf = Buffer.alloc(values.length * 2);
          values.forEach((val, i) => buf.writeUInt16BE(val, i * 2));

          await client.writeMultipleRegisters(address, buf);
          console.log(`✅ Write success [HTTP]: ip=${ip}, address=${address}, values=`, values);

          res.json({
            status: "success",
            ip,
            address,
            values,
          });

          resolve();
        } catch (err) {
          reject(err);
        } finally {
          socket.destroy();
        }
      });

      socket.on("error", (err) => {
        reject(new Error(`TCP connection error: ${err.message}`));
      });
    });
  } catch (err) {
    console.error("❌ HTTP Write failed:", err.message);
    res.status(500).json({
      error: err.message || "Write failed",
    });
  }
});


const server = http.createServer(app);

// server.listen(PORT, HOST,() => {
//   console.log(`🚀 API + WebSocket running on http://${HOST}:${PORT}`);
// });

server.listen(7777, () => {
  console.log(`API + WebSocket running on http://localhost:7777`);
});

startWsServer(8888)

export default app;
