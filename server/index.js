const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelizedb = require("./database/config.js");
const { cleanup } = require("./tools/cleaner.js");
const db = require("./models");
const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
})
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientBuildPath));
}

fs.readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


const start = async () => {
  try {
    await sequelizedb.authenticate();
    console.log("Database connected...");
    await db.sequelize.sync();
    cleanup();
    app.listen(port, () => {
      console.log("Server running on port:", port);
      console.log(`http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
};

start();
