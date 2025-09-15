import React , {useState} from "react";
import { ThailandAddressTypeahead } from "react-thailand-address-typeahead";

const FormStep1 = ({ val, handleChange, handleValueChange }) => {

  const [welfareApplicantOtherType , setWelfareApplicantOtherType] = useState("")

const handlecitizenIdInput = (e, index) => {
  const inputVal = e.target.value.replace(/\D/g, "");

  const current = String(val.citizenId || "").split("");
  current[index] = inputVal;

  const newValue = current.join("").slice(0, 13);
  handleChange("citizenId")({ target: { value: newValue } });

  if (inputVal && index < 12) {
    setTimeout(() => {
      document.querySelectorAll(".idBox")[index + 1]?.focus();
    }, 10);
  }
};

const handlecitizenIdKeyDown = (e, index) => {
  if (e.key === "Backspace") {
    const current = String(val.citizenId || "").split("");
    if (!current[index] && index > 0) {
      e.preventDefault();
      const newVal = [...current];
      newVal[index - 1] = "";
      handleChange("citizenId")({ target: { value: newVal.join("") } });

      setTimeout(() => {
        document.querySelectorAll(".idBox")[index - 1]?.focus();
      }, 10);
    } else {
      const newVal = [...current];
      newVal[index] = "";
      handleChange("citizenId")({ target: { value: newVal.join("") } });
    }
  }
};


  return (
    <div value={val} onValueChange={handleValueChange}>
      <div className="formLabel">
        <label htmlFor="docId">เลขที่</label>
        <input
          placeholder="เลขที่ใบสมัคร"
          style={{ width: "100px" }}
          type="number"
          value={val.docId || ""}
          onChange={handleChange("docId")}
        />
      </div>

      <div className="formLabel">
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div>
            <label htmlFor="RegisterDate">วันที่</label>
            <input
              placeholder="วันที่สมัคร"
              type="number"
              style={{ width: "50px" }}
              min={1}
              max={31}
              value={val.RegisterDate || ""}
              onChange={handleChange("RegisterDate")}
            />
          </div>
          <div>
            <label htmlFor="RegisterMonth">เดือน</label>
            <input
              placeholder="เดือนที่สมัคร"
              list="months"
              value={val.RegisterMonth || ""}
              onChange={handleChange("RegisterMonth")}
              className="dropdownInput"
            />
            <datalist id="months">
              <option value="มกราคม" />
              <option value="กุมภาพันธ์" />
              <option value="มีนาคม" />
              <option value="เมษายน" />
              <option value="พฤษภาคม" />
              <option value="มิถุนายน" />
              <option value="กรกฎาคม" />
              <option value="สิงหาคม" />
              <option value="กันยายน" />
              <option value="ตุลาคม" />
              <option value="พฤศจิกายน" />
              <option value="ธันวาคม" />
            </datalist>
          </div>

          <div>
            <label htmlFor="RegisterYear">พ.ศ.</label>
            <input
              placeholder="ปีที่สมัคร"
              list="years"
              value={val.RegisterYear || ""}
              onChange={handleChange("RegisterYear")}
              className="dropdownInput"
            />
            <datalist id="years">
              {Array.from({ length: 20 }, (_, i) => {
                const year = 2568 - i;
                return <option key={year} value={year} />;
              })}
            </datalist>
          </div>
        </div>
      </div>

      {/* /////////////////////////////////////////////////////// */}

      <h3 style={{ color: "#127681", fontSize: "24px", fontWeight: "normal" }}>
        1. ข้อมูลส่วนบุคคล
      </h3>

      {/* /////////////////////////////////////////////////////// */}

      <div className="formLabel">
        <div>
          <label htmlFor="name">ชื่อ</label>
          <input
            style={{ width: "120px", marginRight: "10px" }}
            placeholder=""
            list="titleName"
            value={val.titleName || ""}
            onChange={handleChange("titleName")}
            className="dropdownInput"
          />
          <datalist id="titleName">
            <option value="นาย" />
            <option value="นาง" />
            <option value="นางสาว" />
          </datalist>

          <input
            type="text"
            placeholder="ชื่อ"
            value={val.name || ""}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <label htmlFor="lastname">นามสกุล</label>
          <input
            type="text"
            placeholder="นามสกุล"
            value={val.lastname || ""}
            onChange={handleChange("lastname")}
          />
        </div>
      </div>

      <div className="formLabel">
        <div>
          <label htmlFor="nickname">ชื่ออาหรับ</label>
          <input
            type="text"
            placeholder="ชื่ออาหรับ"
            value={val.nickname || ""}
            onChange={handleChange("nickname")}
          />
        </div>
        <div>
          <label htmlFor="age">อายุ</label>
          <input
            type="number"
            style={{ width: "50px" }}
            placeholder="อายุ"
            value={val.age || ""}
            onChange={handleChange("age")}
          />
          <label>ปี</label>
        </div>
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <div>
            <label htmlFor="birthDate">เกิดวันที่</label>
            <input
              placeholder="วันที่เกิด"
              type="number"
              style={{ width: "50px" }}
              min={1}
              max={31}
              value={val.birthDate || ""}
              onChange={handleChange("birthDate")}
            />
          </div>
          <div>
            <label htmlFor="birthMonth">เดือน</label>
            <input
              placeholder="เดือนที่เกิด"
              list="months"
              value={val.birthMonth || ""}
              onChange={handleChange("birthMonth")}
              className="dropdownInput"
            />
            <datalist id="months">
              <option value="มกราคม" />
              <option value="กุมภาพันธ์" />
              <option value="มีนาคม" />
              <option value="เมษายน" />
              <option value="พฤษภาคม" />
              <option value="มิถุนายน" />
              <option value="กรกฎาคม" />
              <option value="สิงหาคม" />
              <option value="กันยายน" />
              <option value="ตุลาคม" />
              <option value="พฤศจิกายน" />
              <option value="ธันวาคม" />
            </datalist>
          </div>

          <div>
            <label htmlFor="birthYear">พ.ศ.</label>
            <input
              placeholder="ปีที่เกิด"
              list="years"
              value={val.birthYear || ""}
              onChange={handleChange("birthYear")}
              className="dropdownInput"
            />
            <datalist id="years">
              {Array.from({ length: 201 }, (_, i) => {
                const currentYear = new Date().getFullYear() + 543;
                const year = currentYear - 100 + i;
                return <option key={year} value={year} />;
              })}
            </datalist>
          </div>
        </div>
      </div>

      <div className="formLabel">
        <label htmlFor="citizenId">หมายเลขบัตรประชาชน</label>
        <div className="idCardInputWrapper">
          {Array.from({ length: 13 }).map((_, index) => {
 let idString;
 if(val.citizenId === null){
  idString = "ไม่ระบุ"
}
else {

  idString = String(val.citizenId || "");
}

const value = idString[index] || "";
const isDash = [0, 4, 9, 11].includes(index);

return (
  <React.Fragment key={index}>
    <input
      style={{ width: "30px" }}
      type="text"
      placeholder=""
      maxLength={1}
      value={value}
      onChange={(e) => handlecitizenIdInput(e, index)}
      onKeyDown={(e) => handlecitizenIdKeyDown(e, index)}
      className="idBox"
    />
    {isDash && <span className="dash">-</span>}
  </React.Fragment>
);

          })}
        </div>
      </div>

      <div className="formLabel">
        <div>
          <label htmlFor="houseNumber">ปัจจุบันอยู่บ้านเลขที่</label>
          <input
            type="text"
            placeholder="บ้านเลขที่"
            value={val.houseNumber || ""}
            onChange={handleChange("houseNumber")}
          />
        </div>
        <div>
          <label htmlFor="moo">หมู่</label>
          <input
            type="number"
            style={{ width: "50px" }}
            placeholder="หมู่ที่"
            value={val.housemoo || ""}
            onChange={handleChange("housemoo")}
          />
        </div>
        <div>
          <label htmlFor="houseSoi">ซอย</label>
          <input
            type="text"
            placeholder="ซอย"
            value={val.houseSoi || ""}
            onChange={handleChange("houseSoi")}
          />
        </div>
        <div>
          <label htmlFor="houseRoad">ถนน</label>
          <input
            type="text"
            placeholder="ถนน"
            value={val.houseRoad || ""}
            onChange={handleChange("houseRoad")}
          />
        </div>
      </div>

      <ThailandAddressTypeahead
        value={{
          subdistrict: val.houseSubdistrict || "",
          district: val.houseDistrict || "",
          province: val.houseProvince || "",
        }}
        onValueChange={(newVal) => {
          handleValueChange({
            houseSubdistrict: newVal.subdistrict,
            houseDistrict: newVal.district,
            houseProvince: newVal.province,
          });
        }}
      >
        <div className="formLabel">
          <label htmlFor="houseSubdistrict">ตำบล</label>
          <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล" />
          <label htmlFor="houseDistrict">อำเภอ</label>
          <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ" />
          <label htmlFor="houseProvince">จังหวัด</label>
          <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
        </div>

        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>

      <div className="formLabel">
        <div>
          <label htmlFor="mobilePhone">โทรศัพท์มือถือ</label>
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={val.mobilePhone || ""}
            onChange={handleChange("mobilePhone")}
          />
        </div>
        <div>
          <label htmlFor="housePhone">โทรศัพท์บ้าน</label>
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={val.housePhone || ""}
            onChange={handleChange("housePhone")}
          />
        </div>
      </div>

      <div className="formLabel">
        <label>สถานภาพ</label>
        <div className="radioGroup">
          <label className="radioItem">
            <input
              type="radio"
              name="maritalStatus"
              value="single"
              checked={val.maritalStatus === "single"}
              onChange={handleChange("maritalStatus")}
            />
            <span>โสด</span>
          </label>

          <label className="radioItem">
            <input
              type="radio"
              name="maritalStatus"
              value="married"
              checked={val.maritalStatus === "married"}
              onChange={handleChange("maritalStatus")}
            />
            <span>สมรส</span>
          </label>
        </div>
      </div>

      <div className="formLabel">
        <label>บุคคลสมรม</label>
        <div>
          <label htmlFor="spouseName">ชื่อ</label>
          <input
            style={{ width: "120px", marginRight: "10px" }}
            placeholder=""
            list="titlespouseName"
            value={val.titlespouseName || ""}
            onChange={handleChange("titlespouseName")}
            className="dropdownInput"
          />
          <datalist id="titlespouseName">
            <option value="นาย" />
            <option value="นาง" />
            <option value="นางสาว" />
          </datalist>

          <input
            type="text"
            placeholder="ชื่อ"
            value={val.spouseName || ""}
            onChange={handleChange("spouseName")}
          />
        </div>
        <div>
          <label htmlFor="spouseLastname">นามสกุล</label>
          <input
            type="text"
            placeholder="นามสกุล"
            value={val.spouseLastname || ""}
            onChange={handleChange("spouseLastname")}
          />
        </div>
      </div>

      <div className="formLabel">
        <div>
          <label htmlFor="spouseAge">อายุ</label>
          <input
            type="number"
            style={{ width: "50px" }}
            placeholder="อายุ"
            value={val.spouseAge || ""}
            onChange={handleChange("spouseAge")}
          />
          <label>ปี</label>
        </div>
        <div>
          <label htmlFor="spousePhone">โทรศัพท์มือถือ</label>
          <input
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={val.spousePhone || ""}
            onChange={handleChange("spousePhone")}
          />
        </div>
      </div>

      <div className="formLabel">
        <label style={{ padding: "12px" }}>ผู้ขอสวัสดิการ </label>
        <div className="radioGroup">
          <label className="radioItem">
            <input
              type="radio"
              name="welfareApplicantType"
              value="husband"
              checked={val.welfareApplicantType === "husband"}
              onChange={handleChange("welfareApplicantType")}
            />
            <span>สามี</span>
          </label>

          <label className="radioItem">
            <input
              type="radio"
              name="welfareApplicantType"
              value="wife"
              checked={val.welfareApplicantType === "wife"}
              onChange={handleChange("welfareApplicantType")}
            />
            <span>ภรรยา</span>
          </label>

          <label className="radioItem">
            <input
              type="radio"
              name="welfareApplicantType"
              value="child"
              checked={val.welfareApplicantType === "child"}
              onChange={handleChange("welfareApplicantType")}
            />
            <span>บุตร</span>
          </label>
<label className="radioItem">
  <input
    type="radio"
    name="welfareApplicantType"
    value=" "
    checked={
      val.welfareApplicantType !== "husband" &&
      val.welfareApplicantType !== "wife" &&
      val.welfareApplicantType !== "child" &&
      val.welfareApplicantType !== null &&
      val.welfareApplicantType !== undefined &&
      val.welfareApplicantType !== ""
    }
    onChange={() => {
      handleChange("welfareApplicantType")({
        target: { value: welfareApplicantOtherType || " " },
      });
    }}
  />
  <span>อื่นๆ</span>

  {val.welfareApplicantType !== "husband" &&
    val.welfareApplicantType !== "wife" &&
    val.welfareApplicantType !== "child" && (
      <input
        type="text"
        style={{ margin: "0px 10px" }}
        placeholder="โปรดระบุ"
        value={val.welfareApplicantType || welfareApplicantOtherType}
        onChange={(e) => {
          const text = e.target.value;
          setWelfareApplicantOtherType(text);
          handleChange("welfareApplicantType")({
            target: { value: text },
          });
        }}
      />
    )}
</label>

        </div>
      </div>

      <div className="formLabel">
        <div>
          <label htmlFor="welfareApplicantName">ชื่อ</label>
          <input
            style={{ width: "120px", marginRight: "10px" }}
            placeholder=""
            list="titlewelfareApplicantName"
            value={val.titlewelfareApplicantName || ""}
            onChange={handleChange("titlewelfareApplicantName")}
            className="dropdownInput"
          />
          <datalist id="titlewelfareApplicantName">
            <option value="นาย" />
            <option value="นาง" />
            <option value="นางสาว" />
          </datalist>

          <input
            type="text"
            placeholder="ชื่อ"
            value={val.welfareApplicantName || ""}
            onChange={handleChange("welfareApplicantName")}
          />
        </div>
        <div>
          <label htmlFor="welfareApplicantLastName">นามสกุล</label>
          <input
            type="text"
            placeholder="นามสกุล"
            value={val.welfareApplicantLastName || ""}
            onChange={handleChange("welfareApplicantLastName")}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
{
  /* <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" /> */
}
