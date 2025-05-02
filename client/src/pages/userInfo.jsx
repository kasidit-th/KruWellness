import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserData1 from "../components/UserData1";
import SignupAndEdit from "./SignupAndEdit"

const UserInfo = () => {
  const val = "8888";
  const { citizenId } = useParams();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <>
      {!showEditForm ? (
        <div style={{ display: "flex", gap: "50px", padding: "50px" }}>
          <div style={{ flex: 1 , maxWidth:"300px" }}>
            <img
              src="https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/22f1b7f8-54e4-43e3-316f-fc2465df9500/avatarhd"
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
                src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                alt=""
                style={{ width: "auto", height: "640px"}}
              />
            </div>

            <div style={{ padding: "30px", border: "1px solid #127681", display:"flex" , justifyContent:"center" }}>
              <img
                src="https://amzirlodp-prd-s3.s3.amazonaws.com/documents/images/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg"
                alt=""
                style={{ width: "auto", height: "640px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <SignupAndEdit memberData={{ citizenId, val }} isEditMode={true} />
      )}
    </>
  );
};

export default UserInfo;
