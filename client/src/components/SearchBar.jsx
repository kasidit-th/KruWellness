import React from 'react';

const SearchBar = ({ setKeyword }) => {
  return (
    <div style={{ backgroundColor: "#127681", margin: "20px 0px", padding: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <h1 style={{ color: "white", fontWeight: "inherit", margin: 0 }}>ค้นหาเอกสาร</h1>

      <div style={{ position: 'relative', width: '60%' }}>
        <input
          type="text"
          placeholder="ค้นหาด้วยเลขบัตรประชาชน / ชื่อเล่น / ชื่อจริง"
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: '20px 0px 20px 10px', 
            width: '100%',
            borderRadius: '50px',
            fontSize: '18px',
            border: 'none',
            outline: 'none',
          }}
        />
        <span style={{
          position: 'absolute',
          right: '0px',
          top: '50%',
          borderRadius:"50%",
          padding:"10px",
          transform: 'translateY(-50%)',
          backgroundColor:"#F3C623",
          fontSize: '20px',
          pointerEvents: 'none',
        }}>
          🔍
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
