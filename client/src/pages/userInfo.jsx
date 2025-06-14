import React, { useState , useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import UserData1 from "../components/UserData1";
import SignupAndEdit from "./SignupAndEdit"

const UserInfo = () => {
  const [val , setval] = useState([]);
  const [formid , setFormid] = useState(0);
  const { citizenId } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);

const handleEdit = () => {
  const password = prompt("กรุณากรอกรหัสผ่านเพื่อแก้ไขข้อมูล:");
  if (password === "123456789") {
    setShowEditForm(true);
  } else {
    alert("รหัสผ่านไม่ถูกต้อง");
  }
};


  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    axios.post(`${baseURL}/api/detail` ,{
      formid:citizenId
    })
      .then(res => {
        setval(res.data.info);
        setFormid(res.data.formid)
        console.log(res.data.info);
        console.log(res.data);
        
      })
      .catch(err => {
        console.error(err);
      });
  }, []);



  return (
    <>
      {!showEditForm ? (
        <div style={{ display: "flex", gap: "50px", padding: "50px" }}>
          <div style={{ flex: 1 , maxWidth:"300px" }}>
            <img
              src={val.teacherPicture}
              alt=""
              style={{ width: "100%", height: "auto" , border:"1px solid #127681" }}
            />
            <button
              className="button"
              style={{ width: "100%", marginTop: "30px" }}
              type="button"
              onClick={handleEdit}
            >
              แก้ไขข้อมูล
            </button>
          </div>
          <div style={{ display: "flex",flexDirection:"column" ,flex: 4, gap: "10px" }}>
            <div style={{ padding: "30px", border: "1px solid #127681" }}>
              <UserData1 val={val} />
            </div>

            <div style={{ padding: "30px", border: "1px solid #127681", display:"flex" , justifyContent:"center" }}>
              <img
                src={val.copyIdcard}
                alt=""
                style={{ width: "auto", height: "640px"}}
              />
            </div>

            <div style={{ padding: "30px", border: "1px solid #127681", display:"flex" , justifyContent:"center" }}>
              <img
                src={val.copyTeachercard}
                alt=""
                style={{ width: "auto", height: "640px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <SignupAndEdit memberData={val} formid={formid} isEditMode={true} />
      )}
    </>
  );
};

export default UserInfo;
