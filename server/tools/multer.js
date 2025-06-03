const multer = require("multer");
const path = require("path");
const { file_idgenerate } = require("./function.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      let folder = "";
      switch (file.fieldname) {
        case "teacherPicture":
          folder = "../uploads/picture/";
          break;
        case "copyIdcard":
          folder = "../uploads/copy_idcard/";
          break;
        case "copyTeachercard":
          folder = "../uploads/copy_teachercard/";
          break;
        default:
          return cb(new Error("Unknown field: " + file.fieldname));
      }
      cb(null, folder);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const allowedFileType = [".jpg", ".jpeg", ".png"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!allowedFileType.includes(fileExt)) {
      return cb(new Error(`Invalid file type for ${file.fieldname}`));
    }
    const filename = file_idgenerate() + fileExt;
    switch (file.fieldname) {
      case "teacherPicture":
        req.copy_form = path.join("/uploads/picture/", filename);
        break;
      case "copyIdcard":
        req.copy_idcard = path.join("/uploads/copy_idcard/", filename);
        break;
      case "copyTeachercard":
        req.copy_teachercard = path.join(
          "/uploads/copy_teachercard/",
          filename
        );
        break;
    }
    cb(null, filename);
  },
});

exports.uploadAllFiles = multer({ storage }).fields([
  { name: "teacherPicture", maxCount: 1 },
  { name: "copyIdcard", maxCount: 1 },
  { name: "copyTeachercard", maxCount: 1 },
]);
