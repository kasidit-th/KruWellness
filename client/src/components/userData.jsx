import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const UserData = ({ data, setKeyword }) => {
  const navigate = useNavigate();

  const formatId = (id) => {
    if (!id || id.length !== 13) return id;
    return `${id[0]}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${id[12]}`;
  };

  const groupedData = data?.reduce((acc, teacher) => {
    const school = teacher.schoolName || "ไม่ระบุโรงเรียน";
    if (!acc[school]) acc[school] = [];
    acc[school].push(teacher);
    return acc;
  }, {});

  return (
    <div>
      <SearchBar setKeyword={setKeyword} />

      {data?.length > 0 ? (
        Object.entries(groupedData).map(([schoolName, teachers], index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <h3
              style={{
                fontSize: "20px",
                backgroundColor: "#127681",
                color: "#F5F5F5",
                padding: "10px",
                margin: "0",
              }}
            >
              {schoolName}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "0px",
              }}
            >
              {teachers.map((teacher, i) => (
                <div
                  onClick={() => navigate(`/userInfo/${teacher.docId}`)}
                  key={i}
                  className="ListContainer"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={teacher.image || "./default-profile.png"}
                    alt={teacher.name || "ไม่ทราบชื่อ"}
                    style={{ width: "160px", height: "160px" }}
                  />
                  <p><strong>ครู {teacher.nickname}</strong></p>
                  <p>{teacher.name} {teacher.lastname}</p>
                  <p>{teacher.mobilePhone || "--"}</p>
                  <p>{teacher.teachStatus || "--"}</p>
                  <p>{teacher.houseNumber}, {teacher.houseSubdistrict}, {teacher.houseDistrict}, {teacher.houseProvince}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#000000" }}>--ไม่พบข้อมูล--</p>
      )}
    </div>
  );
};

export default UserData;
