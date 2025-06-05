const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { file_idgenerate } = require("./function.js");

const allowedFileTypes = [".jpg", ".jpeg", ".png"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      let folder = "";

      if (!file || !file.fieldname) {
        return cb(new Error("❌ File or fieldname is missing."));
      }

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
          return cb(new Error(`❌ LIMIT_UNEXPECTED_FILE: ${file.fieldname}.`));
      }

      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    } catch (error) {
      cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      if (!file || !file.fieldname) {
        return cb(new Error("❌ File or fieldname is missing."));
      }

      const fileExt = path.extname(file.originalname).toLowerCase();

      if (!allowedFileTypes.includes(fileExt)) {
        return cb(
          new Error(
            `❌ Invalid file type for ${file.fieldname}. Allowed: JPG, JPEG, PNG.`
          )
        );
      }

      const filename = file_idgenerate() + fileExt;

      switch (file.fieldname) {
        case "teacherPicture":
          if (typeof req.body.teacherPicture === String) {
            break;
          } else req.teacherpicture = `/uploads/picture/${filename}`;
          break;
        case "copyForm":
          if (typeof req.body.copyForm === String) {
            break;
          } else req.copy_form = `/uploads/copy_form/${filename}`;
          break;
        case "copyIdcard":
          if (typeof req.body.copyIdcard === String) {
            break;
          } else req.copy_idcard = `/uploads/copy_idcard/${filename}`;
          break;
        case "copyTeachercard":
          if (typeof req.body.copyTeachercard === String) {
            break;
          } else req.copy_teachercard = `/uploads/copy_teachercard/${filename}`;
          break;
      }

      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

exports.uploadAllFiles = multer({ storage }).fields([
  { name: "teacherPicture", maxCount: 1 },
  { name: "copyForm", maxCount: 1 },
  { name: "copyIdcard", maxCount: 1 },
  { name: "copyTeachercard", maxCount: 1 },
]);
