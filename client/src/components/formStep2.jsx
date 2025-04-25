import React from 'react';

const formStep2 = ({ val, setVal }) => {
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVal({ ...val, [key]: { file, preview: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (key) => {
    setVal({ ...val, [key]: null });
  };

  const renderUploadSection = (label, key) => (
    <div style={{ marginBottom: '20px' }}>
      <h4>{label}</h4>
      {val[key]?.preview ? (
        <div style={{display:"flex", flexDirection:"column" , alignItems:"center"}}>
          <img
            src={val[key].preview}
            alt={label}
            style={{ maxWidth: '350px', display: 'block', marginBottom: '10px', border:"3px solid #127681" }}
          />
          <div style={{display:"flex"}}>
          <label onClick={() => handleRemove(key)} style={{ marginRight: '10px' ,  cursor: 'pointer', color: '#242323' , backgroundColor:"#F3C623", padding:"10px 50px" }}>
            ลบ
          </label>
          <label style={{ marginRight: '10px' ,  cursor: 'pointer', color: '#242323' , backgroundColor:"#F3C623", padding:"10px 50px" }}>
            แก้ไข
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, key)}
              style={{ display: 'none' }}
            />
          </label>
          </div>
        </div>
      ) : (

      <div style={{display:"flex" ,justifyContent:"center", margin:"0px 30%" ,padding:"10%" , backgroundColor:"#D9D9D9"}}>
         <label style={{ cursor: 'pointer', color: '#242323' , backgroundColor:"white", padding:"20px 80px" }}>
         เลือกไฟล์
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, key)}
          style={{ display: 'none' }}

        />
        </label>
      </div>
      )}
    </div>
  );

  return (
    <div>
      <h3 style={{ color: "#127681", fontSize: "24px", fontWeight: "normal" }}>2. อัพโหลดไฟล์หลักฐาน</h3>
      {renderUploadSection('2.1 สำเนาบัตรประชาชน', 'idCard')}
      {renderUploadSection('2.2 สำเนาบัตรประจำตัวครู', 'teacherCard')}
      {renderUploadSection('2.3 รูปถ่าย', 'photo')}
    </div>
  );
};

export default formStep2;
