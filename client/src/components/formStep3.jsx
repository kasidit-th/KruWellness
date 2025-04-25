import React from "react";
import { ThailandAddressTypeahead } from "react-thailand-address-typeahead";

const formStep3 = ({ val, handleChange, handleValueChange }) => (
  <div value={val} onValueChange={handleValueChange}>
    <h3 style={{ color: "#127681", fontSize: "24px", fontWeight: "normal" }}>
      3. ข้อมูลเพิ่มเติม
    </h3>
    <div className="formLabel">
      <label>ปัจจุบันเป็น</label>
      <div className="radioGroup">
        <label className="radioItem">
          <input
            type="radio"
            name="teachStatus"
            value="teacher"
            checked={val.teachStatus === "teacher"}
            onChange={handleChange("teachStatus")}
          />
          <span>ครู</span>
        </label>

        <label className="radioItem">
          <input
            type="radio"
            name="teachStatus"
            value="manager"
            checked={val.teachStatus === "manager"}
            onChange={handleChange("teachStatus")}
          />
          <span>ผู้บริหาร</span>
        </label>
      </div>
    </div>

    <div className="formLabel">
      <div>
        <label htmlFor="schoolName">โรงเรียน</label>
        <input
          type="text"
          placeholder="ชื่อโรงเรียน"
          value={val.schoolName || ""}
          onChange={handleChange("schoolName")}
        />
      </div>
      <div>
        <label htmlFor="schoolId">เลขที่</label>
        <input
          type="text"
          placeholder=""
          value={val.schoolId || ""}
          onChange={handleChange("schoolId")}
        />
      </div>

      <div>
        <label htmlFor="schoolRoad">ถนน</label>
        <input
          type="text"
          placeholder=""
          value={val.schoolRoad || ""}
          onChange={handleChange("schoolRoad")}
        />
      </div>
    </div>

    <ThailandAddressTypeahead
      value={{
        subdistrict: val.schoolSubdistrict || "",
        district: val.schoolDistrict || "",
        province: val.schoolProvince || "",
      }}
      onValueChange={(newVal) => {
        handleValueChange({
          schoolSubdistrict: newVal.subdistrict,
          schoolDistrict: newVal.district,
          schoolProvince: newVal.province,
        });
      }}
    >
      <div className="formLabel">
        <label htmlFor="schoolSubdistrict">ตำบล</label>
        <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล" />
        <label htmlFor="schoolDistrict">อำเภอ</label>
        <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ" />
        <label htmlFor="schoolProvince">จังหวัด</label>
        <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
      </div>

      <ThailandAddressTypeahead.Suggestion />
    </ThailandAddressTypeahead>

    <div className="formLabel">
        <div>
          <label htmlFor="examUnit">หน่วยสอบที่</label>
          <input
            type="number"
            placeholder="หน่วยสอบ"
            value={val.examUnit || ""}
            onChange={handleChange("examUnit")}
          />
        </div>
        <div>
          <label htmlFor="educationDistrict">เขตการศึกษาที่</label>
          <input
            type="number"
            placeholder="เขตการศึกษา"
            value={val.educationDistrict || ""}
            onChange={handleChange("educationDistrict")}
          />
        </div>
      </div>

      <div className="formLabel">
     <div className="radioGroup">
        <label className="radioItem">
          <input
            type="radio"
            name="note"
            value="newCard"
            checked={val.note === "newCard"}
            onChange={handleChange("note")}
          />
          <span>(หมายเหตุ) ขอมีบัตรใหม่</span>
        </label>

        <label className="radioItem">
          <input
            type="radio"
            name="note"
            value="renewalCard"
            checked={val.note === "renewalCard"}
            onChange={handleChange("note")}
          />
          <span>ขอต่ออายุบัตร</span>
        </label>
        <label className="radioItem">
          <input
            type="radio"
            name="note"
            value="payMembership"
            checked={val.note === "payMembership"}
            onChange={handleChange("note")}
          />
          <span>เสียค่าสมาชิก</span>
        </label>
      </div>
    </div>







  </div>
);

export default formStep3;
