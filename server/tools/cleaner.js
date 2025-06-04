const fs = require("fs");
const path = require("path");
const Form = require("../models/Form.js");
const Personal = require("../models/Personal_Info.js");

exports.cleanup = async () => {
  try {
    const formDB = await Form.findAll();
    const personDB = await Personal.findAll();

    // Set of all valid filenames (not full paths)
    const validFilenames = new Set();

    formDB.forEach((item) => {
      if (item.copy_form) validFilenames.add(path.basename(item.copy_form));
      if (item.copy_idcard) validFilenames.add(path.basename(item.copy_idcard));
      if (item.copy_teachercard) validFilenames.add(path.basename(item.copy_teachercard));
    });

    personDB.forEach((item) => {
      if (item.picture) validFilenames.add(path.basename(item.picture));
    });

    // Directory where files are stored
    const baseDir = path.resolve(__dirname, "..", "uploads");

    // Recursively collect all files in baseDir
    function getAllFiles(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          results = results.concat(getAllFiles(filePath));
        } else {
          results.push(filePath);
        }
      });
      return results;
    }

    const allFiles = getAllFiles(baseDir);

    // Delete only files whose basename is not in validFilenames
    for (const file of allFiles) {
      const filename = path.basename(file);
      if (!validFilenames.has(filename)) {
        fs.unlinkSync(file);
        console.log(`🗑️ Deleted unused file: ${filename}`);
      }
    }

    console.log("✅ Cleanup complete.");
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  }
};
