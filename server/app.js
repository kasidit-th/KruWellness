import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import net from 'net';
import cors from 'cors';
import { readFile } from 'fs/promises';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/config.routes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.json({ message: "Hello from HTTP!" });
});
app.use("/api", userRoutes);


const server = http.createServer(app);


server.listen(5000, () => {
  console.log(`API running on http://localhost:5000`);
});


export default app;
