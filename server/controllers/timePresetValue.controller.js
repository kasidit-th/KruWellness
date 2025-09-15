import net from "net";
import modbus from "jsmodbus"; // ต้องแน่ใจว่ามี library นี้

export const editTimePresetValue = (req, res) => {
  const { ip, address, values } = req.body;

  // ตรวจสอบข้อมูล input
  if (!ip || address == null || !Array.isArray(values)) {
    return res.status(400).json({ error: "❌ Missing ip, address, or values" });
  }

  if (values.length !== 3) {
    return res.status(400).json({ error: "❌ Exactly 3 values are required: [hour, minute, preset]" });
  }

  const [hour, minute, preset] = values;

  // ตรวจสอบว่าอยู่ในช่วงที่ถูกต้อง
  if (
    hour < 0 || hour > 23 ||
    minute < 0 || minute > 59 ||
    preset < 0 || preset > 6
  ) {
    return res.status(400).json({ 
      error: "❌ Invalid values. Hour must be 0–23, minute 0–59, preset 0–6." 
    });
  }

  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket);

  // เตรียม buffer สำหรับ 3 ค่า
  const buf = Buffer.alloc(6); // 3 ค่า * 2 bytes
  buf.writeUInt16BE(hour, 0);     // address
  buf.writeUInt16BE(minute, 2);   // address + 1
  buf.writeUInt16BE(preset, 4);   // address + 2

  // เริ่มเชื่อมต่อและเขียนค่า
  socket.connect({ host: ip, port: 502 }, async () => {
    try {
      await client.writeMultipleRegisters(address, buf);
      res.json({
        status: "✅ Write success",
        ip,
        startingAddress: address,
        dataWritten: { hour, minute, preset }
      });
    } catch (err) {
      res.status(500).json({ error: `❌ Write error: ${err.message}` });
    } finally {
      socket.destroy();
    }
  });

  socket.on("error", (err) => {
    res.status(500).json({ error: `❌ Connection error: ${err.message}` });
  });
};

