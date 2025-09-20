import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";

const filePath = path.join(process.cwd(), "./config/data.csv");

function readCSV() {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return parse(fileContent, { columns: true, skip_empty_lines: true });
}

function writeCSV(data) {
  const csv = stringify(data, { header: true });
  fs.writeFileSync(filePath, csv);
}

export const getAll = (req, res) => {
  const users = readCSV();
  res.json(users);
};

export const getById = (req, res) => {
  const users = readCSV();
  console.log(users);
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const create = (req, res) => {
  const users = readCSV();
  const newUser = {
    id: String(Date.now()), // auto id
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  writeCSV(users);
  res.status(201).json(newUser);
};

export const update = (req, res) => {
  const users = readCSV();
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], ...req.body };
  writeCSV(users);
  res.json(users[index]);
};

export const remove = (req, res) => {
  const users = readCSV();
  const filtered = users.filter((u) => u.id !== req.params.id);
  if (filtered.length === users.length)
    return res.status(404).json({ message: "User not found" });

  writeCSV(filtered);
  res.json({ message: "Deleted successfully" });
};
