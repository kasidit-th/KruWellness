const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const xlsx = require("xlsx");
const ROOT_DIR = path.resolve(__dirname, "..");
const { ISO_to_Thai } = require("./function");

exports.exportcsvxlsx = async () => {
  try {
    const EXPORT_DIR = path.join(__dirname, "..", "exports");
    const DB_PATH = path.join(__dirname, "..", "database", "database.sqlite");
    const EXCEL_FILE_PATH = path.join(EXPORT_DIR, "database_export.xlsx");

    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR);
    }

    const columnMappings = {
      Personal_Infos: {
        id: "id",
        prefix: "คำนำหน้า",
        firstname: "ชื่อจริง",
        lastname: "นามสกุล",
        nickname: "ชื่อเล่น",
        picture: "ที่อยู่รูปภาพครู",
        birthdate: "วันที่เกิด",
        age: "อายุ",
        idcard_number: "หมายเลขบัตรประจำตัวประชาชน",
        schoolposition: "ตำแหน่งในโรงเรียน",
        mobile_number: "เบอร์มือถือ",
        landline_number: "เบอร์บ้าน",
        address: "ที่อยู่ปัจจุบัน",
        marital_status: "สถานภาพสมรส",
        spouse_prefix: "คำนำหน้าคู่สมรส",
        spouse_firstname: "ชื่อจริงคู่สมรส",
        spouse_lastname: "นามสกุลคู่สมรส",
        spouse_age: "อายุคู่สมรส",
        spouse_mobile_number: "เบอร์มือถือคู่สมรส",
        createdAt: "วันที่สร้างข้อมูล",
        updatedAt: "วันที่แก้ไขข้อมูลล่าสุด",
      },
      Welfare_Infos: {
        id: "id",
        personid: "personid",
        relation: "ความสัมพันธ์กับผู้กรอก",
        prefix: "คำนำหน้า",
        firstname: "ชื่อจริง",
        lastname: "นามสกุล",
        createdAt: "วันที่สร้างข้อมูล",
        updatedAt: "วันที่แก้ไขข้อมูลล่าสุด",
      },
      School_Infos: {
        id: "id",
        schoolname: "ชื่อโรงเรียน",
        servicearea: "เขตการศึกษาที่",
        examunit: "หน่วยสอบที่",
        schooladdress: "ที่อยู่โรงเรียน",
        createdAt: "วันที่สร้างข้อมูล",
        updatedAt: "วันที่แก้ไขข้อมูลล่าสุด",
      },
      Forms: {
        id: "id",
        number: "เลขที่เอกสาร",
        informdate: "วันที่กรอก",
        personid: "personid",
        welfareid: "welfareid",
        schoolid: "schoolid",
        type: "ประเภทเอกสาร",
        copy_form: "ที่อยู่สำเนาเอกสาร",
        copy_idcard: "ที่อยู่สำเนาบัตรประจำตัวประชาชน",
        copy_teachercard: "ที่อยู่สำเนาบัตรครู",
        createdAt: "วันที่สร้างข้อมูล",
        updatedAt: "วันที่แก้ไขข้อมูลล่าสุด",
      },
    };

    const db = new sqlite3.Database(DB_PATH);

    db.all(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
      [],
      async (err, tables) => {
        if (err) throw err;

        const workbook = xlsx.utils.book_new();

        for (const { name: tableName } of tables) {
          const csvPath = path.join(EXPORT_DIR, `${tableName}.csv`);

          await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tableName};`, [], (err, rows) => {
              if (err) return reject(err);
              if (rows.length === 0) {
                fs.writeFileSync(csvPath, "");
                return resolve();
              }

              const columnMap = columnMappings[tableName] || {};
              const transformedRows = rows.map((row) => {
                const newRow = {};

                for (const key in row) {
                  let newKey = columnMap[key] || key;

                  if (
                    [
                      "informdate",
                      "createdAt",
                      "updatedAt",
                      "birthdate",
                    ].includes(key)
                  ) {
                    try {
                      const [d, m, y] = ISO_to_Thai(row[key]);
                      newRow[newKey] = `${d} ${m} ${y}`;
                    } catch {
                      newRow[newKey] = "";
                    }
                  } else if (["schooladdress", "address"].includes(key)) {
                    try {
                      let arrayaddress = row[key];
                      arrayaddress = JSON.parse(arrayaddress);
                      newRow[newKey] = arrayaddress.join(" ");
                    } catch {
                      newRow[newKey] = "";
                    }
                  } else if (
                    [
                      "picture",
                      "copy_form",
                      "copy_idcard",
                      "copy_teachercard",
                    ].includes(key)
                  ) {
                    const absolutePath = path.join(ROOT_DIR, row[key] || "");
                    newRow[newKey] = absolutePath.replace(/\//g, "\\"); // Windows-style
                  } else {
                    newRow[newKey] = row[key];
                  }
                };

                return newRow;
              });

              const headers = Object.keys(transformedRows[0]);
              const csvContent = [
                headers.join(","),
                ...transformedRows.map((row) =>
                  headers.map((h) => escapeCsv(row[h])).join(",")
                ),
              ].join("\n");

              fs.writeFileSync(csvPath, csvContent);

              const worksheet = xlsx.utils.json_to_sheet(transformedRows);
              xlsx.utils.book_append_sheet(workbook, worksheet, tableName);
              resolve();
            });
          });

          console.log(`Exported ${tableName}`);
        }

        try {
          xlsx.writeFile(workbook, EXCEL_FILE_PATH);
          console.log(`Excel file saved to: ${EXCEL_FILE_PATH}`);
        } catch (e) {
          console.error("❌ Failed to write Excel file. Is it open in Excel?");
          throw e;
        }

        db.close();
      }
    );
  } catch (error) {
    console.log("Export failed:", error);
  }
};

function escapeCsv(value) {
  if (value == null) return "";
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}
