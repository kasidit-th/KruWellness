import { error } from "console";
import { config } from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const configPath = path.join(__dirname, "../../client/src/config/config.json");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === "development" || !process.defaultApp;

const DATA_FILE = isDev
  ? path.join(__dirname, "../config/points.json") 
  : path.join(process.resourcesPath, "app", "server", "config", "points.json"); 

const generatePresets = () => {
  const presets = [];
  for (let i = 1; i <= 6; i++) {
    presets.push({
      presetsId: i,
      name: `Light${i}`,
      address: 300 + (i - 1) * 50,
    });
  }
  return presets;
};

const generateTime = () => {
  const time = [];
  for (let i = 1; i <= 8; i++) {
    time.push({
      timeId: i,
      name: `Set Time${i}`,
      address: 600 + (i - 1) * 10,
    });
  }
  return time;
};

export const updateZoneTimeName = async (req, res) => {
  const { zoneIndex, timeIndex, newName } = req.body;

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const configData = JSON.parse(data);

    if (!configData.zone[zoneIndex]?.time[timeIndex]) {
      return res.status(404).json({ message: "Zone or time not found" });
    }

    configData.zone[zoneIndex].time[timeIndex].name = newName;

    await fs.writeFile(DATA_FILE, JSON.stringify(configData, null, 2));
    res.json({ message: "Name updated successfully" });
  } catch (error) {
    console.error("Error updating config:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateZonePresetName = async (req, res) => {
  const { zoneIndex, presetIndex, newName } = req.body;

  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const configData = JSON.parse(data);

    if (!configData.zone[zoneIndex]?.presets[presetIndex]) {
      return res.status(404).json({ message: "Zone or preset not found" });
    }

    configData.zone[zoneIndex].presets[presetIndex].name = newName;
    await fs.writeFile(DATA_FILE, JSON.stringify(configData, null, 2));
    res.json({ message: "Name updated successfully" });
  } catch (error) {
    console.error("Error updating config:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createZone = async (req, res) => {
  const { name, ip, port, countvalue } = req.body;

  if (!ip || !port || countvalue === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const configPath = path.resolve(
      process.cwd(),
      "../client/src/config/config.json"
    );

    const configData = await fs.readFile(configPath, "utf8");
    const config = JSON.parse(configData);

    const isDuplicate = config.zone.some(
      (zone) => zone.ip === ip && zone.port === port
    );
    if (isDuplicate) {
      return res.status(400).json({ error: "Zone already exists" });
    }

    const newZone = {
      name: name,
      ip: ip,
      port: Number(port),
      countvalue: Number(countvalue),
      presets: Array.from({ length: 6 }, (_, i) => ({
        presetsId: i + 1,
        name: `Light${i + 1}`,
        address: 300 + i * 50,
      })),
      time: Array.from({ length: 8 }, (_, i) => ({
        timeId: i + 1,
        name: `Set Time${i + 1}`,
        address: 600 + i * 10,
      })),
    };

    config.zone.push(newZone);

    await fs.writeFile(configPath, JSON.stringify(config, null, 2));

    res.status(201).json(newZone);
  } catch (error) {
    console.error("Error creating zone:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editZone = async (req,res) => {
  const { zoneIndex, newName, newIP, newPort, newCountvalue } = req.body;

  try {
    const data = await fs.readFile(configPath, "utf-8");
    const configData = JSON.parse(data);

    if (!configData.zone || zoneIndex >= configData.zone.length || zoneIndex < 0) {
      return res.status(404).json({ message : "Zone not found" })
    }

    configData.zone[zoneIndex].name = newName;
    configData.zone[zoneIndex].ip = newIP;
    configData.zone[zoneIndex].port = Number(newPort);
    configData.zone[zoneIndex].countvalue = Number(newCountvalue);

    await fs.writeFile(configPath, JSON.stringify(configData, null, 2))
    res.json({ message: "Zone updated successfully" })
  } catch {
    console.error("Error updating zone : ", error)
    res.status(500).json({message: "Internal server error"})
  }
}

export const deleteZone = async(req,res) => {
  const {zoneIndex} = req.body;

  try {
    const data = await fs.readFile(configPath, "utf-8");
    const configData = JSON.parse(data);

    if (!configData.zone || zoneIndex >= configData.zone.length || zoneIndex < 0) {
      return res.status(404).json({ message : "Zone not found"});
    }

    configData.zone.splice(zoneIndex, 1);

    await fs.writeFile(configPath, JSON.stringify(configData, null, 2));
    res.json({ message: "Zone deleted successfully" });
  } catch (error) {
    console.error("Error deleting zone :", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
