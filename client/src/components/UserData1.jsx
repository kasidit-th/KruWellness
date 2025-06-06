import React, { useState } from "react";

const UserData1 = ({ val }) => {
  // const val = {
  //   docId: "89754",
  //   RegisterDate: "12",
  //   RegisterMonth: "เมษายน",
  //   RegisterYear: "2566",
  //   titleName: "นาย",
  //   name: "สมชาย",
  //   lastname: "ใจดี",
  //   nickname: "ซาอุด",
  //   age: "35",
  //   birthDate: "15",
  //   birthMonth: "มีนาคม",
  //   birthYear: "2533",
  //   citizenId: "3256987458963",
  //   houseNumber: "123/4",
  //   housemoo: "5",
  //   houseSoi: "สุขใจ 7",
  //   houseRoad: "ประชาราษฎร์",
  //   houseSubdistrict: "บางเขน",
  //   houseDistrict: "หลักสี่",
  //   houseProvince: "กรุงเทพมหานคร",
  //   mobilePhone: "0891234567",
  //   housePhone: "021234567",
  //   maritalStatus: "married",
  //   titlespouseName: "นาง",
  //   spouseName: "สวยสุดา",
  //   spouseLastname: "ใจดี",
  //   spouseAge: "34",
  //   spousePhone: "0897654321",
  //   welfareApplicantType: "child",
  //   welfareApplicantOtherType: "",
  //   titlewelfareApplicantName: "เด็กชาย",
  //   welfareApplicantName: "สมปอง",
  //   welfareApplicantLastName: "ใจดี",
  //   teachStatus: "teacher",
  //   schoolName: "โรงเรียนบ้านบางเขน",
  //   schoolId: "987",
  //   schoolRoad: "งามวงศ์วาน",
  //   schoolSubdistrict: "ทุ่งสองห้อง",
  //   schoolDistrict: "หลักสี่",
  //   schoolProvince: "กรุงเทพมหานคร",
  //   examUnit: "หน่วยที่ 2",
  //   educationDistrict: "เขต 1",
  //   note: "newCard"
  // };
  

  return (
    <div>
      <div className="formLabel">
        <label>เลขที่</label>
        <div className="formData" style={{ width: "100px" }}>
          {val.docId || ""}
        </div>
      </div>

      <div className="formLabel">
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <label>วันที่</label>
          <div className="formData" style={{ width: "50px" }}>
            {val.RegisterDate || ""}
          </div>
          <label>เดือน</label>
          <div className="formData">{val.RegisterMonth || ""}</div>
        </div>
        <label>พ.ศ.</label>
        <div className="formData">{val.RegisterYear || ""}</div>
      </div>

      <h3 style={{ color: "#127681", fontSize: "24px", fontWeight: "normal" }}>
        1. ข้อมูลส่วนบุคคล
      </h3>

      <div className="formLabel">
        <label>ชื่อ</label>
        <div
          style={{ width: "120px", marginRight: "10px" }}
          className="formData"
        >
          {val.titleName || ""}
        </div>

        <div className="formData">{val.name || ""}</div>
        <label>นามสกุล</label>
        <div className="formData">{val.lastname || ""}</div>
      </div>

      <div className="formLabel">
        <label>ชื่ออาหรับ</label>
        <div className="formData">{val.nickname || ""}</div>
        <label>อายุ</label>
        <div className="formData" style={{ width: "50px" }}>
          {val.age || ""}
        </div>
        <label>ปี</label>
      </div>
      <div className="formLabel">
        <label>เกิดวันที่</label>
        <div className="formData" style={{ width: "50px" }}>
          {val.birthDate || ""}
        </div>
        <label>เดือน</label>
        <div className="formData">{val.birthMonth || ""}</div>
        <label>พ.ศ.</label>
        <div className="formData">{val.birthYear || ""}</div>
      </div>

      <div className="formLabel">
        <label>หมายเลขบัตรประชาชน</label>
        <div
          className="idCardInputWrapper"
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {Array.from({ length: 13 }).map((_, index) => {
            const isDashAfter = [0, 4, 9, 11].includes(index);

            return (
              <React.Fragment key={index}>
                <div
                  className="idBox"
                  style={{ fontSize: "24px", padding: "10px", height: "30px" }}
                >
                  {String(val.citizenId)?.[index] || ""}
                </div>
                {isDashAfter && (
                  <span style={{ margin: "0 4px", fontSize: "18px" }}>-</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="formLabel">
        <label>ปัจจุบันอยู่บ้านเลขที่</label>
        <div className="formData">{val.houseNumber || ""}</div>
        <label>หมู่</label>
        <div className="formData" style={{ width: "50px" }}>
          {val.housemoo || ""}
        </div>
        <label>ซอย</label>
        <div className="formData">{val.houseSoi || ""}</div>
        <label>ถนน</label>
        <div className="formData">{val.houseRoad || ""}</div>
      </div>

      <div className="formLabel">
        <label>ตำบล</label>
        <div className="formData">{val.houseSubdistrict || ""}</div>
        <label>อำเภอ</label>
        <div className="formData">{val.houseDistrict || ""}</div>
        <label>จังหวัด</label>
        <div className="formData">{val.houseProvince || ""}</div>
      </div>

      <div className="formLabel">
        <label>โทรศัพท์มือถือ</label>
        <div className="formData">{val.mobilePhone || ""}</div>
        <label>โทรศัพท์บ้าน</label>
        <div className="formData">{val.housePhone || ""}</div>
      </div>

      <div className="formLabel">
        <label style={{ padding: "12px" }}>สถานภาพ</label>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.maritalStatus === "single" ? "checked" : ""
            }`}
          ></div>
          <span>โสด</span>
        </div>

        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.maritalStatus === "married" ? "checked" : ""
            }`}
          ></div>
          <span>สมรส</span>
        </div>
      </div>

      <div className="formLabel">
        <label>บุคคลสมรม</label>
        <div style={{ margin: "0px" }} sty className="formLabel">
          <label>ชื่อ</label>
          <div
            style={{ width: "120px", marginRight: "10px" }}
            className="formData"
          >
            {val.titlespouseName || ""}
          </div>

          <div className="formData">{val.spouseName || ""}</div>
          <label>นามสกุล</label>
          <div className="formData">{val.spouseName || ""}</div>
        </div>
      </div>

      <div className="formLabel">
        <label>อายุ</label>
        <div className="formData">{val.spouseAge || ""}</div>
        <label>ปี</label>
        <label>โทรศัพท์มือถือ</label>
        <div className="formData">{val.spousePhone || ""}</div>
      </div>

      <div className="formLabel">
        <label style={{ padding: "12px" }}>ผู้ขอสวัสดิการ </label>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.welfareApplicantType === "husband" ? "checked" : ""
            }`}
          ></div>
          <span>สามี</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.welfareApplicantType === "wife" ? "checked" : ""
            }`}
          ></div>
          <span>ภรรยา</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.welfareApplicantType === "child" ? "checked" : ""
            }`}
          ></div>
          <span>บุตร</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${val.welfareApplicantType !== "husband" && val.welfareApplicantType !== "wife" && val.welfareApplicantType !== "child" ? "checked" : ""
            }`}
          ></div>
          <span>อื่นๆ</span>
        </div>
        <div
          className="formData"
          style={{ margin: "0px 10px", height: "24px" }}
        >

          {val.welfareApplicantType !== "husband" && val.welfareApplicantType !== "wife" && val.welfareApplicantType !== "child" ? val.welfareApplicantType  : ""}
        </div>
      </div>

      <div className="formLabel">
        <label>ชื่อ</label>
        <div
          className="formData"
          style={{ width: "120px", marginRight: "10px" }}
        >
          {val.titlewelfareApplicantName || ""}
        </div>
        <div className="formData">{val.welfareApplicantName || ""}</div>

        <label>นามสกุล</label>
        <div className="formData">{val.welfareApplicantLastName || ""}</div>
      </div>

      <h3 style={{ color: "#127681", fontSize: "24px", fontWeight: "normal" }}>
      3. ข้อมูลเพิ่มเติม
    </h3>
    <div className="formLabel">
      <label>ปัจจุบันเป็น</label>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.teachStatus === "teacher" ? "checked" : ""
            }`}
          ></div>
          <span>ครู</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.teachStatus === "manager" ? "checked" : ""
            }`}
          ></div>
           <span>ผู้บริหาร</span>
        </div>
      </div>

      <div className="formLabel">
        <label>โรงเรียน</label>
        <div className="formData" style={{width:"480px"}}>{val.schoolName || ""}</div>
        <label>เลขที่</label>
        <div className="formData" style={{ width: "50px" }}>
          {val.schoolid || ""}
        </div>
      </div>
      <div className="formLabel">
        <label>ถนน</label>
        <div className="formData">{val.schoolRoad || ""}</div>
        <label>ตำบล</label>
        <div className="formData">{val.schoolSubdistrict || ""}</div>
        <label>อำเภอ</label>
        <div className="formData">{val.schoolDistrict || ""}</div>
      </div>

      <div className="formLabel">
        <label>จังหวัด</label>
        <div className="formData">{val.schoolProvince || ""}</div>
        <label>หน่วยสอบ</label>
        <div className="formData">{val.examUnit || ""}</div>
        <label>เขตการศึกษา</label>
        <div className="formData">{val.educationDistrict || ""}</div>
      </div>

      <div className="formLabel">
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.note === "newCard" ? "checked" : ""
            }`}
          ></div>
          <span>(หมายเหตุ) ขอมีบัตรใหม่</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.note === "continueCard" ? "checked" : ""
            }`}
          ></div>
           <span>ขอต่ออายุบัตร</span>
        </div>
        <div className="customRadioItem">
          <div
            className={`customRadioBox ${
              val.note === "continueMember" ? "checked" : ""
            }`}
          ></div>
           <span>เสียค่าสมาชิก</span>
        </div>
      </div>

    </div>

  );
};

export default UserData1;
