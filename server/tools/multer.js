const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { file_idgenerate } = require("./function.js");

const allowedFileTypes = [".jpg", ".jpeg", ".png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      let folder = "";
      switch (file.fieldname) {
        case "teacherPicture":
          folder = path.join(__dirname, "../uploads/picture/");
          break;
        case "copyForm":
          folder = path.join(__dirname, "../uploads/copy_form/");
          break;
        case "copyIdcard":
          folder = path.join(__dirname, "../uploads/copy_idcard/");
          break;
        case "copyTeachercard":
          folder = path.join(__dirname, "../uploads/copy_teachercard/");
          break;
        default:
          return res.status(400).json({
            message: `❌ LIMIT_UNEXPECTED_FILE ${file.fieldname}.`,
          });
      }

      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedFileTypes.includes(fileExt)) {
      return res.status(400).json({
        message: `❌ Invalid file type for ${file.fieldname}. Allowed: JPG, JPEG, PNG.`,
      });
    }

    const filename = file_idgenerate() + fileExt;

    switch (file.fieldname) {
      case "teacherPicture":
        req.teacherpicture = `/uploads/picture/${filename}`;
        break;
      case "copyForm":
        req.copy_form = `/uploads/copy_form/${filename}`;
        break;
      case "copyIdcard":
        req.copy_idcard = `/uploads/copy_idcard/${filename}`;
        break;
      case "copyTeachercard":
        req.copy_teachercard = `/uploads/copy_teachercard/${filename}`;
        break;
    }

    cb(null, filename);
  },
});

exports.uploadAllFiles = multer({ storage }).fields([
  { name: "teacherPicture", maxCount: 1 },
  { name: "copyForm", maxCount: 1 },
  { name: "copyIdcard", maxCount: 1 },
  { name: "copyTeachercard", maxCount: 1 },
]);
