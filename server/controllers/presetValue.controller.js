import net from 'net';
import modbus from 'jsmodbus'; 
import { readFile } from "fs/promises";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === "development" || !process.defaultApp;

const DATA_FILE = isDev
  ? path.join(__dirname, "../config/points.json") 
  : path.join(process.resourcesPath, "app", "server", "config", "points.json"); 


// export const getPreset = (req, res) => {
//   const filePath = path.join(__dirname, '..', 'config', 'points.json');
//   const Id = req.query.activeZone
//   console.log(Id);
//   // console.log(filePath);
  
  
//   res.sendFile(filePath);
// }

// export const getPreset = async (req, res) => {
//   try {
//     const activeZone = req.query.activeZone
//     console.log('activeZone:', activeZone);

//     if (!activeZone) {
//       return res.status(400).json({ error: "Missing activeZone" });
//     }

//     fs.readFile(DATA_FILE, "utf-8", (err, data) => {
//       if (err) {
//         console.error("Read error:", err);
//         return res.status(500).json({ error: "Read failed" });
//       }
//     })

//     // const filePath = path.join(__dirname, '..', 'config', 'points.json');
//     // const rawData = await fs.readFile(filePath, 'utf-8');
//     // const data = JSON.parse(rawData);

//     // if (isNaN(activeZone)) {
//     //   return res.status(400).json({ error: "activeZone query parameter is missing or invalid" });
//     // }

//     // กรองเฉพาะ zone ที่ Id ตรงกับ activeZone
//     // const filteredZones = data.zone.filter(z => z.Id === activeZone);

//     // return res.json({ zone: filteredZones });
//     return res.sendFile(DATA_FILE);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getPreset = async (req, res) => {
  try {
    const isConsole = req.query.console === 'true';
    const isTimer = req.query.timer === 'true'
    const activeZone = Number(req.query.activeZone || req.query.zoneInt) + 1;

    if (isNaN(activeZone)) {
      return res.status(400).json({ error: "Missing or invalid activeZone" });
    }

    const rawData = await readFile(DATA_FILE, 'utf-8');
    const jsonData = JSON.parse(rawData);

    const filtered = jsonData.zone.filter(z => z.Id === activeZone);

    if (filtered.length === 0) {
      return res.status(404).json({ error: "Zone not found" });
    }

    const presets = filtered[0].presets;
    return res.json(isConsole ? presets.slice(0, 2) : isTimer ? presets : presets.slice(2));
  } catch (error) {
    console.error("Error in getPreset:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// export const getPreset = async (req, res) => {
//   try {
//     const activeZone = req.query.activeZone;
//     const filePath = path.join(__dirname, '..', 'config', 'points.json');
//     const rawData = await fs.readFile(filePath, 'utf8');
//     const data = JSON.parse(rawData);

//     console.log(activeZone);

//     if (activeZone) {
//       // กรองเฉพาะ zone ที่ Id ตรงกับ activeZone (แปลงเป็นตัวเลขก่อน)
//       const filteredZones = data.zone.filter(z => z.Id === Number(activeZone));
//       return res.json({ zone: filteredZones });
//     }
//     // ถ้าไม่มี activeZone ส่งทั้งหมด
//     res.json(data);
//   } catch (error) {
//     console.error('Error in getPreset:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const writePresetValue = (req, res) => {
  const ip = req.params.id;
  const { value } = req.body;

  if (!ip || value == null) {
    return res.status(400).json({ error: "Missing IP or value" });
  }

  if (typeof value !== "number" || value < 1 || value > 6) {
    return res.status(400).json({ error: "Value must be a number between 1 and 6" });
  }

  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket);
  const address = 1;


  socket.connect({ host: ip, port: 502 }, async () => {
    try {
      await client.writeSingleRegister(address, value);
      res.json({ status: "✅ Write success", ip, address, value });
    } catch (err) {
      res.status(500).json({ error: `❌ Write error: ${err.message}` });
    } finally {
      socket.destroy();
    }
  });

  socket.on("timeout", () => {
    socket.destroy();
    res.status(500).json({ error: "❌ Connection timed out" });
  });

  socket.on("error", (err) => {
    res.status(500).json({ error: `❌ Connection error: ${err.message}` });
  });
};


export const editPresetValue = (req , res) => {
      const { ip, address, values } = req.body;
    
      if (!ip || address == null || !Array.isArray(values)) {
        return res.status(400).json({ error: "Missing ip, address, or values" });
      }
    //   const maxAddress = 13;
    // const maxLength = maxAddress - address + 1;
    
    // if (values.length > maxLength) {
    //   return res.status(400).json({ error: `Too many values. Can only write ${maxLength} registers from address ${address} to ${maxAddress}` });
    // }
    
      const socket = new net.Socket();
      const client = new modbus.client.TCP(socket);
    
     const buf = Buffer.alloc(values.length * 2); 
    
    values.forEach((val, i) => {
      buf.writeUInt16BE(val, i * 2);
    });
    
    const quantity = values.length;
      // const quantity = buf.length / 2;
    
      socket.connect({ host: ip, port: 502 }, async () => {
        try {
          await client.writeMultipleRegisters(address, buf);
          res.json({ status: "✅ Write success", ip, address, values });
        } catch (err) {
          res.status(500).json({ error: `❌ Write error: ${err.message}` });
        } finally {
          socket.destroy();
        }
      });
    
      socket.on("error", (err) => {
        res.status(500).json({ error: `❌ Connection error: ${err.message}` });
      });
}