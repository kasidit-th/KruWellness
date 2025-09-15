import { readFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === "development" || !process.defaultApp;

const DATA_FILE = isDev
  ? path.join(__dirname, "../config/points.json") 
  : path.join(process.resourcesPath, "app", "server", "config", "points.json"); 

export const postPoints = async (req, res) => {
  try {
    const activeZone = req.body.activeZone;
    const activeImageIndex = req.body.activeImageIndex
    const id = req.body.id;

    console.log("active:", activeZone);
    console.log("id:", id);

    if (activeZone === undefined || activeZone === null) {
      return res.status(400).json({ error: "Missing or invalid activeZone" });
    }
    if (!id) {
      return res.status(400).json({ error: "Missing or invalid id" });
    }

    const rawData = await readFile(DATA_FILE, 'utf-8');
    const jsonData = JSON.parse(rawData);

    const filtered = jsonData.zone.filter(z => z.Id === activeZone);

    if (!filtered.length) {
      return res.status(404).json({ error: "Zone not found" });
    }

    const data = filtered[0].pages?.[activeImageIndex].info.filter(i => i.id === id);

    return res.json({ success: true, data: data });
  } catch (err) {
    console.error("Error in postPoints:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


// เพิ่มจุดใหม่
// export const createPoints = (req, res) => {
//   try {
//     const newClick = req.body.newClick;
//     const page = req.body.pageInt
//     const Id = req.body.Id;
//     // console.log(Id);
//     if (!newClick) {
//       return res.status(400).json({ error: "Missing newClick or Id" });
//     }

//     fs.readFile(DATA_FILE, "utf8", (err, data) => {
//       if (err) {
//         console.error("Read error:", err);
//         return res.status(500).json({ error: "Read failed" });
//       }

//       let json;
//       try {
//         json = JSON.parse(data || '{ "zone": [] }');
//       } catch (parseError) {
//         console.error("JSON parse error:", parseError);
//         return res.status(500).json({ error: "Invalid JSON format" });
//       }

//       const targetZone = json.zone.find((z) => z.Id === Id);
//       if (!targetZone) {
//         return res.status(404).json({ error: "Zone not found" });
//       }

//       const nextId = (targetZone.pages?.[page].info?.length || 0) + 1;
//       console.log(nextId);
      

//       const newEntry = {
//         ...newClick,
//         id: nextId,
//       };

//       if (!targetZone.info) targetZone.info = [];
//       targetZone.info.push(newEntry);

//       fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2), (writeErr) => {
//         if (writeErr) {
//           console.error("Write error:", writeErr);
//           return res.status(500).json({ error: "Write failed" });
//         }

//         return res.json({ success: true, added: newEntry });
//       });
//     });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     res.status(500).json({ error: "Unexpected error occurred" });
//   }
// };

export const createPoints = (req, res) => {
  try {
    const newClick = req.body.newClick;
    const page = req.body.pageInt;  // should be a number
    const Id = req.body.Id;

    if (!newClick || typeof page !== 'number' || !Id) {
      return res.status(400).json({ error: "Missing or invalid newClick, pageInt or Id" });
    }

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
      if (err) {
        console.error("Read error:", err);
        return res.status(500).json({ error: "Read failed" });
      }

      let json;
      try {
        json = JSON.parse(data || '{ "zone": [] }');
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        return res.status(500).json({ error: "Invalid JSON format" });
      }

      const targetZone = json.zone.find((z) => z.Id === Id);
      if (!targetZone) {
        return res.status(404).json({ error: "Zone not found" });
      }

      // Make sure targetZone.pages and targetZone.pages[page] exist
      if (!targetZone.pages) targetZone.pages = [];
      if (!targetZone.pages[page]) targetZone.pages[page] = { info: [] };
      if (!targetZone.pages[page].info) targetZone.pages[page].info = [];

      const nextId = targetZone.pages[page].info.length + 1;

      const newEntry = {
        ...newClick,
        id: nextId,
      };

      targetZone.pages[page].info.push(newEntry);

      fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Write error:", writeErr);
          return res.status(500).json({ error: "Write failed" });
        }

        return res.json({ success: true, added: newEntry });
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error occurred" });
  }
};

