const Form = require("../models/Form.js");
const Personal = require("../models/Personal_Info.js");
const School = require("../models/School_Info.js");
const Welfare = require("../models/Welfare_Recipient.js");
const sequelize = require("../database/config");
const Sequelize = require("sequelize");
const { cleanup } = require("../tools/cleaner.js");
const { Thai_to_ISO, ISO_to_Thai } = require("../tools/function.js");
const { exportcsvxlsx } = require("../tools/exporter.js");
const { Faker, th, en } = require("@faker-js/faker");
const faker = new Faker({ locale: [th, en] });
const db = require("../models");
require("dotenv").config();

const maritalStatus = (status) => {
  if (status === "married") {
    return true;
  } else return false;
};

const trimRequestBody = (body) => {
  const trimmed = {};
  for (const key in body) {
    if (typeof body[key] === "string") {
      trimmed[key] = body[key].trim();
    } else {
      trimmed[key] = body[key]; // Leave non-strings unchanged
    }
  }
  return trimmed;
};

exports.create = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const personDB = await Personal.findOne({
      where: { firstname: req.body.name, lastname: req.body.lastname },
    });
    if (!personDB) {
      const birthdate = Thai_to_ISO(
        req.body.birthDate,
        req.body.birthMonth,
        req.body.birthYear
      );
      const marital_status = maritalStatus(req.body.maritalStatus);
      const stringaddress = [
        req.body.houseNumber,
        req.body.housemoo,
        req.body.houseSoi,
        req.body.houseRoad,
        req.body.houseSubdistrict,
        req.body.houseDistrict,
        req.body.houseProvince,
      ].join(",");

      const address = stringaddress.split(",");

      let personel_data = {
        prefix: req.body.titleName,
        firstname: req.body.name,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        picture: null,
        birthdate: birthdate,
        age: req.body.age,
        idcard_number: req.body.citizenId,
        schoolposition: req.body.teachStatus,
        mobile_number: req.body.mobilePhone,
        landline_number: req.body.housePhone,
        address: address,
        marital_status: marital_status,
        spouse_prefix: req.body.titlespouseName,
        spouse_firstname: req.body.spouseName,
        spouse_lastname: req.body.spouseLastname,
        spouse_age: req.body.spouseAge,
        spouse_mobile_number: req.body.spousePhone,
      };
      if (req.teacherpicture) {
        personel_data.picture = req.teacherpicture;
      }
      const personal = await Personal.create(personel_data);
      req.personid = personal.id;
    } else req.personid = personDB.id;

    const schoolDB = await School.findOne({
      where: { schoolname: req.body.schoolName },
    });
    if (!schoolDB) {
      const stringschooladdress = [
        req.body.schoolName,
        req.body.schoolRoad,
        req.body.schoolSubdistrict,
        req.body.schoolDistrict,
        req.body.schoolProvince,
      ].join(",");

      const schooladdress = stringschooladdress.split(",");

      const school_data = {
        schoolname: req.body.schoolName,
        servicearea: req.body.educationDistrict,
        examunit: req.body.examUnit,
        schooladdress: schooladdress,
      };
      const school = await School.create(school_data);
      req.schoolid = school.id;
    } else req.schoolid = schoolDB.id;

    const welfareDB = await Welfare.findOne({
      where: {
        firstname: req.body.welfareApplicantName,
        lastname: req.body.welfareApplicantLastName,
      },
    });
    if (!welfareDB) {
      const welfare_data = {
        personid: req.personid,
        relation: req.body.welfareApplicantType,
        prefix: req.body.titlewelfareApplicantName,
        firstname: req.body.welfareApplicantName,
        lastname: req.body.welfareApplicantLastName,
      };
      const welfare = await Welfare.create(welfare_data);
      req.welfareid = welfare.id;
    } else req.welfareid = welfareDB.id;

    const informdate = Thai_to_ISO(
      req.body.RegisterDate,
      req.body.RegisterMonth,
      req.body.RegisterYear
    );

    let form_data = {
      number: req.body.docId,
      informdate: informdate,
      personid: req.personid,
      welfareid: req.welfareid,
      schoolid: req.schoolid,
      type: req.body.note,
      copy_form: null,
      copy_idcard: null,
      copy_teachercard: null,
    };

    if (req.copy_form) {
      form_data.copy_form = req.copy_form;
    }

    if (req.copy_idcard) {
      form_data.copy_idcard = req.copy_idcard;
    }

    if (req.copy_teachercard) {
      form_data.copy_teachercard = req.copy_teachercard;
    }

    if (String(req.body.note) === "newCard") {
      const cardDB = await Form.findOne({
        where: { personid: req.personid, type: "continueCard" },
      });
      if (!cardDB) {
        form_data.type = "continueCard";
      }
    }
    const form = await Form.create(form_data);
    exportcsvxlsx();
    res.status(200).json({
      items: form.id,
      message: "Create form success",
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error create new form",
    });
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const formid = req.body.formid;
    const form = await Form.findOne({ where: { id: formid } });
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const personal = await Personal.findOne({
      where: { id: form.personid },
    });
    const welfare = await Welfare.findOne({
      where: { id: form.welfareid },
    });
    const school = await School.findOne({ where: { id: form.schoolid } });

    if (!personal || !welfare || !school) {
      return res.status(404).json({ message: "Related record not found" });
    }

    const birthdate = Thai_to_ISO(
      req.body.birthDate,
      req.body.birthMonth,
      req.body.birthYear
    );

    const informdate = Thai_to_ISO(
      req.body.RegisterDate,
      req.body.RegisterMonth,
      req.body.RegisterYear
    );

    const marital_status = maritalStatus(req.body.maritalStatus);

    const stringaddress = [
      req.body.houseNumber,
      req.body.housemoo,
      req.body.houseSoi,
      req.body.houseRoad,
      req.body.houseSubdistrict,
      req.body.houseDistrict,
      req.body.houseProvince,
    ].join(",");

    const address = stringaddress.split(",");

    const stringschooladdress = [
      req.body.schoolName,
      req.body.schoolRoad,
      req.body.schoolSubdistrict,
      req.body.schoolDistrict,
      req.body.schoolProvince,
    ].join(",");

    const schooladdress = stringschooladdress.split(",");

    let personel_data = {
      prefix: req.body.titleName,
      firstname: req.body.name,
      lastname: req.body.lastname,
      nickname: req.body.nickname,
      picture: personal.picture ?? null,
      birthdate,
      age: req.body.age,
      idcard_number: req.body.citizenId,
      schoolposition: req.body.teachStatus,
      mobile_number: req.body.mobilePhone,
      landline_number: req.body.housePhone,
      address,
      marital_status,
      spouse_prefix: req.body.titlespouseName,
      spouse_firstname: req.body.spouseName,
      spouse_lastname: req.body.spouseLastname,
      spouse_age: req.body.spouseAge,
      spouse_mobile_number: req.body.spousePhone,
    };

    const welfare_data = {
      relation: req.body.welfareApplicantType,
      prefix: req.body.titlewelfareApplicantName,
      firstname: req.body.welfareApplicantName,
      lastname: req.body.welfareApplicantLastName,
    };

    const school_data = {
      schoolname: req.body.schoolName,
      servicearea: req.body.educationDistrict,
      examunit: req.body.examUnit,
      schooladdress,
    };

    let form_data = {
      number: req.body.docId,
      informdate: informdate,
      personid: req.personid,
      welfareid: req.welfareid,
      schoolid: req.schoolid,
      type: req.body.note,
      copy_form: null,
      copy_idcard: null,
      copy_teachercard: null,
    };

    if (req.teacherpicture) {
      personel_data.picture = req.teacherpicture;
    }

    if (req.copy_form) {
      form_data.copy_form = req.copy_form;
    }

    if (req.copy_idcard) {
      form_data.copy_idcard = req.copy_idcard;
    }

    if (req.copy_teachercard) {
      form_data.copy_teachercard = req.copy_teachercard;
    }

    await Personal.update(personel_data, {
      where: { id: form.personid },
    });
    await Welfare.update(welfare_data, {
      where: { id: form.welfareid },
    });
    await School.update(school_data, {
      where: { id: form.schoolid },
    });
    await Form.update(form_data, {
      where: { id: form.id },
    });
    exportcsvxlsx();
    return res.status(200).json({ message: "Update form success" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error update form" });
  }
};

exports.search = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const keyword = req.body.keyword || "";
    const page = parseInt(req.body.page) || 1;
    const limit = 200;
    const offset = (page - 1) * limit;
    const type = req.body.type || "";
    const query = await sequelize.query(
      `
      SELECT f.*, p.firstname, p.lastname, p.nickname, p.idcard_number, p.picture, s.schoolname
      FROM Forms f
      LEFT JOIN Personal_Infos p ON f.personid = p.id
      LEFT JOIN School_Infos s ON f.schoolid = s.id
      WHERE (
        (:keyword = '' OR (
          p.firstname LIKE :kw OR
          p.lastname LIKE :kw OR
          p.nickname LIKE :kw OR
          p.idcard_number LIKE :kw OR
          s.schoolname LIKE :kw
        )) AND
        (:type = '' OR f.type = :type)
      )
      ORDER BY f.informdate ASC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: {
          keyword,
          kw: `%${keyword}%`,
          type,
          limit,
          offset,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    let result = [];
    let schoolname = [];
    const urlprefix = `http://${process.env.HOST}:${process.env.PORT}`;
    query.map((item) => {
      if (!schoolname.includes(item.schoolname)) {
        schoolname.push(item.schoolname);
      }
    });
    schoolname.map((school) => {
      const object = {
        schoolname: String,
        person: Array,
      };
      object.schoolname = school;
      let temp = [];
      query.map((item) => {
        if (item.schoolname === school) {
          const teacherPicture = item.picture
            ? urlprefix + item.picture.replace(/\\/g, "/")
            : "none";
          temp.push({
            id: item.id,
            image: teacherPicture,
            name: item.firstname + " " + item.lastname,
            nickname: item.nickname,
            idcard: item.idcard_number,
          });
        }
      });
      object.person = temp;
      result.push(object);
    });
    return res.status(200).json({ items: result, page });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Error during search" });
  }
};

exports.searchcardexpire = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    req.body = trimRequestBody(req.body);
    const type = "continueCard";
    const keyword = req.body.keyword || "";
    const page = parseInt(req.body.page) || 1;
    const limit = 200;
    const offset = (page - 1) * limit;

    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 4);
    const isoDate = fiveYearsAgo.toISOString();

    const query = await sequelize.query(
      `
      SELECT f.*, p.firstname, p.lastname, p.nickname, p.idcard_number, p.picture, s.schoolname
      FROM Forms f
      LEFT JOIN Personal_Infos p ON f.personid = p.id
      LEFT JOIN School_Infos s ON f.schoolid = s.id
      WHERE (
        (:keyword = '' OR (
          p.firstname LIKE :kw OR
          p.lastname LIKE :kw OR
          p.nickname LIKE :kw OR
          p.idcard_number LIKE :kw OR
          s.schoolname LIKE :kw
        )) AND
        (:type = '' OR f.type = :type) AND
        (f.informdate >= :isoDate)
      )
      ORDER BY f.informdate ASC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: {
          keyword,
          kw: `%${keyword}%`,
          type,
          isoDate,
          limit,
          offset,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const result = [];
    const years = [];
    const urlprefix = `http://${process.env.HOST}:${process.env.PORT}`;
    query.forEach((item) => {
      const [day, month, year] = ISO_to_Thai(item.informdate);

      let yearGroup = years.find((g) => g.year === year);
      if (!yearGroup) {
        yearGroup = { year, months: [] };
        years.push(yearGroup);
      }

      let monthGroup = result.find((m) => m.month === month);
      if (!monthGroup) {
        monthGroup = { year, month, person: [] };
        result.push(monthGroup);
      }

      const teacherPicture = item.picture
        ? urlprefix + item.picture.replace(/\\/g, "/")
        : "none";
      monthGroup.person.push({
        id: item.id,
        image: teacherPicture,
        name: item.firstname + " " + item.lastname,
        nickname: item.nickname,
        idcard: item.idcard_number,
      });
    });
    return res.status(200).json({ items: result, page });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      message: "Error during search",
    });
  }
};

exports.searchmemberfee = async (req, res) => {
  try {
    req.body = trimRequestBody(req.body);
    const type = "continueMember";
    const keyword = req.body.keyword || "";
    const page = parseInt(req.body.page) || 1;
    const limit = 200;
    const offset = (page - 1) * limit;
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    const isoDate = fiveYearsAgo.toISOString();

    const query = await sequelize.query(
      `
      SELECT f.*, p.firstname, p.lastname, p.nickname, p.idcard_number, p.picture, s.schoolname
      FROM Forms f
      LEFT JOIN Personal_Infos p ON f.personid = p.id
      LEFT JOIN School_Infos s ON f.schoolid = s.id
      WHERE (
        (:keyword = '' OR (
          p.firstname LIKE :kw OR
          p.lastname LIKE :kw OR
          p.nickname LIKE :kw OR
          p.idcard_number LIKE :kw OR
          s.schoolname LIKE :kw
        )) AND
        (:type = '' OR f.type = :type) AND
        (f.informdate >= :isoDate)
      )
      ORDER BY f.informdate ASC
      LIMIT :limit OFFSET :offset
      `,
      {
        replacements: {
          keyword,
          kw: `%${keyword}%`,
          type,
          isoDate,
          limit,
          offset,
        },
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    const result = [];
    const urlprefix = `http://${process.env.HOST}:${process.env.PORT}`;
    query.forEach((item) => {
      const [day, month, year] = ISO_to_Thai(item.informdate);

      let yearGroup = result.find((g) => g.year === year);
      if (!yearGroup) {
        yearGroup = { year, person: [] };
        result.push(yearGroup);
      }
      const teacherPicture = item.picture
        ? urlprefix + item.picture.replace(/\\/g, "/")
        : "none";
      yearGroup.person.push({
        id: item.id,
        image: teacherPicture,
        name: item.firstname + " " + item.lastname,
        nickname: item.nickname,
        idcard: item.idcard_number,
      });
    });

    return res.status(200).json({ items: result, page });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error during search",
    });
  }
};

exports.detail = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const formid = req.body.formid;
    const form = await Form.findOne({ where: { id: formid } });
    if (!form) {
      return res.status(404).json({
        message: "ไม่พบฟอร์ม",
      });
    }
    const person = await Personal.findOne({
      where: { id: form.personid },
    });
    if (!person) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลผู้กรอก",
      });
    }
    const school = await School.findOne({ where: { id: form.schoolid } });
    if (!school) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลผู้กรอกและโรงเรียน",
      });
    }
    const welfare = await Welfare.findOne({
      where: { id: form.welfareid },
    });
    if (!welfare) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลผู้รับสวัสดิการ",
      });
    }
    const registerdate = ISO_to_Thai(form.informdate);
    const birthdate = ISO_to_Thai(person.birthdate);
    const maritalStatus = person.marital_status === true ? "married" : "single";
    const urlprefix = `http://${process.env.HOST}:${process.env.PORT}`;
    const teacherPicture = person.picture
      ? urlprefix + person.picture.replace(/\\/g, "/")
      : "none";
    const copyForm = form.copy_form
      ? urlprefix + form.copy_form.replace(/\\/g, "/")
      : "none";
    const copyIdcard = form.copy_idcard
      ? urlprefix + form.copy_idcard.replace(/\\/g, "/")
      : "none";
    const copyTeachercard = form.copy_teachercard
      ? urlprefix + form.copy_teachercard.replace(/\\/g, "/")
      : "none";

    const data = {
      docId: form.number,
      RegisterDate: registerdate[0],
      RegisterMonth: registerdate[1],
      RegisterYear: registerdate[2],
      titleName: person.prefix,
      name: person.firstname,
      lastname: person.lastname,
      nickname: person.nickname,
      teacherPicture: teacherPicture,
      age: person.age,
      birthDate: birthdate[0],
      birthMonth: birthdate[1],
      birthYear: birthdate[2],
      citizenId: person.idcard_number,
      houseNumber: person.address[0],
      housemoo: person.address[1],
      houseSoi: person.address[2],
      houseRoad: person.address[3],
      houseSubdistrict: person.address[4],
      houseDistrict: person.address[5],
      houseProvince: person.address[6],
      mobilePhone: person.mobile_number,
      housePhone: person.landline_number,
      maritalStatus: maritalStatus,
      titlespouseName: person.spouse_prefix,
      spouseName: person.spouse_firstname,
      spouseLastname: person.spouse_lastname,
      spouseAge: person.spouse_age,
      spousePhone: person.spouse_mobile_number,
      welfareApplicantType: welfare.relation,
      titlewelfareApplicantName: welfare.prefix,
      welfareApplicantName: welfare.firstname,
      welfareApplicantLastName: welfare.lastname,
      teachStatus: person.schoolposition,
      schoolName: school.schoolname,
      schoolid: school.schooladdress[0],
      schoolRoad: school.schooladdress[1],
      schoolSubdistrict: school.schooladdress[2],
      schoolDistrict: school.schooladdress[3],
      schoolProvince: school.schooladdress[4],
      examUnit: school.examunit,
      educationDistrict: school.servicearea,
      note: form.type,
      copyForm: copyForm,
      copyIdcard: copyIdcard,
      copyTeachercard: copyTeachercard,
    };
    return res.status(200).json({
      formid: form.id,
      info: data,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error getting info",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const formid = req.body.formid;
    const form = await Form.findOne({ where: { id: formid } });
    if (!form) {
      return res.status(404).json({
        message: "ไม่พบฟอร์ม",
      });
    }
    const person = await Personal.findOne({
      where: { id: form.personid },
    });
    if (!person) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลผู้กรอก",
      });
    }

    await Form.destroy({ where: { id: formid } });

    return res.status(200).json({ message: "ลบข้อมูลเรียบร้อยแล้ว" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({
      message: "Error delete",
    });
  }
};

exports.createDummyData = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    req.body = trimRequestBody(req.body);
    const amount = req.body.amount;

    await db.sequelize.sync();
    const schools = [];
    for (let i = 0; i < 5; i++) {
      const school = await db.School_Info.create({
        schoolname: `โรงเรียนตัวอย่าง ${i + 1}`,
        servicearea: "เขตพื้นที่ A",
        examunit: "เขตสอบ B",
        schooladdress: ["กรุงเทพ", "เขตตัวอย่าง", "แขวงตัวอย่าง", "10200"],
      });
      schools.push(school);
    }

    for (let i = 0; i < amount; i++) {
      const birthdateDate = faker.date.between({
        from: new Date("1970-01-01"),
        to: new Date("2005-01-01"),
      });
      const birthdate = birthdateDate.toISOString().split("T")[0];
      const age = new Date().getFullYear() - birthdateDate.getFullYear();

      const person = await db.Personal_Info.create({
        prefix: faker.person.prefix(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        nickname: faker.string.alpha({ length: 2 }),
        picture: "",
        birthdate,
        age,
        idcard_number: faker.string.numeric(13),
        schoolposition: faker.helpers.arrayElement(["teacher", "manager"]),
        mobile_number: "08" + faker.string.numeric(8),
        landline_number: "02" + faker.string.numeric(7),
        address: ["กรุงเทพ", "ดุสิต", "วชิรพยาบาล", "10300"],
        marital_status: faker.number.int({ min: 0, max: 2 }),
        spouse_prefix: faker.person.prefix(),
        spouse_firstname: faker.person.firstName(),
        spouse_lastname: faker.person.lastName(),
        spouse_age: faker.number.int({ min: 30, max: 60 }),
        spouse_mobile_number: "08" + faker.string.numeric(8),
      });

      const welfare = await db.Welfare_Recipient.create({
        personid: person.id,
        relation: faker.helpers.arrayElement([
          "child",
          "husband",
          "wife",
          "father",
          "mother",
        ]),
        prefix: faker.person.prefix(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
      });

      await db.Form.create({
        number: Number(
          Array.from({ length: 5 }, () =>
            faker.number.int({ min: 1, max: 9 })
          ).join("")
        ),
        informdate: faker.date.recent({ days: 30 }).toISOString().split("T")[0],
        personid: person.id,
        welfareid: welfare.id,
        schoolid: faker.helpers.arrayElement(schools).id,
        type: faker.helpers.arrayElement([
          "newCard",
          "continueCard",
          "continueMember",
        ]),
      });

      console.log(`✅ เพิ่มข้อมูลคนที่ ${i + 1}`);
    }

    console.log(`🎉 เพิ่มข้อมูล dummy ครบ ${amount} คนเรียบร้อยแล้ว`);

    if (res) {
      return res
        .status(200)
        .json({ message: `เพิ่มข้อมูล dummy ครบ ${amount} เรียบร้อยแล้ว` });
    } else {
      process.exit();
    }
  } catch (error) {
    console.log("Error: ", error);
    if (res) {
      return res.status(500).json({ message: "❌ เพิ่มข้อมูลล้มเหลว", error });
    } else {
      process.exit(1);
    }
  }
};

exports.clearall = async (req, res) => {
  try {
    await sequelize.query("PRAGMA foreign_keys = OFF;");
    await sequelize.query("DELETE FROM Forms;");
    await sequelize.query("DELETE FROM Welfare_Infos;");
    await sequelize.query("DELETE FROM Personal_Infos;");
    await sequelize.query("DELETE FROM School_Infos;");
    await sequelize.query("PRAGMA foreign_keys = ON;");
    cleanup();
    res.status(200).json({ message: "🧹 ล้างข้อมูลทั้งหมดเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "❌ ลบข้อมูลล้มเหลว", error });
  }
};
