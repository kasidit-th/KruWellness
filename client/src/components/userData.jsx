import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const UserData = ({ data , setKeyword }) => {
  const navigate = useNavigate();

  const formatId = (id) => {
    if (!id || id.length !== 13) return id;
    return `${id[0]}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${
      id[12]
    }`;
  };

  return (
    <div>
      <SearchBar setKeyword={setKeyword} />

{data?.length > 0 ? (
  data.map((schoolData, index) => {
    let filteredTeachers = [];

    if (schoolData.person) {
      filteredTeachers = schoolData.person;
    } else if (schoolData.year) {
      filteredTeachers = data;
    }

    if (!filteredTeachers || filteredTeachers.length === 0) return null;

    return (
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
{schoolData.schoolname
  || (schoolData.month && schoolData.year ? `${schoolData.month} ปี พ.ศ. ${schoolData.year}` : null)
  || (schoolData.year ? `ปี พ.ศ. ${schoolData.year}` : null)
  || "เกิดข้อผิดพลาด"}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "0px",
          }}
        >
          {filteredTeachers.map((teacher , i) => (
            <div
              onClick={() => navigate(`/userInfo/${teacher.id}`)}
              key={i}
              className="ListContainer"
              style={{ cursor: "pointer" }}
            >
              <img
                src={teacher.image || "/default-profile.png"}
                alt={teacher.name || "ไม่ทราบชื่อ"}
                style={{ width: "160px", height: "160px" }}
              />
              <p><strong>ครู {teacher.nickname}</strong></p>
              <p>{teacher.name}</p>
              <p>{formatId(teacher.idcard)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  })
) : (
  <p style={{ color: "#000000" }}>--ไม่พบข้อมูล--</p>
)}

    </div>
  );
};

export default UserData;
