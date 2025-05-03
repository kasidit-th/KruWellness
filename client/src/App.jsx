import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupAndEdit from './pages/SignupAndEdit';
import Expired from './pages/Expired';
import Membership from './pages/Membership';
import UserInfo from './pages/userInfo';


const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    backgroundColor: location.pathname === path ? '#F3C623' : 'transparent',
    padding: '10px 15px',
    textDecoration: 'none',
    color: location.pathname === path ? '#F5F5F5' : '#242323',
  });

  return (
    <nav>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", alignItems: "center" , padding:"0px 5vw" }}>
        <div></div>
        <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center", margin: "20px 0px" }}>
          <Link to="/" style={linkStyle('/')}>ดูข้อมูลครู</Link>
          <Link to="/expired" style={linkStyle('/expired')}>บัตรหมดอายุ</Link>
          <Link to="/membership" style={linkStyle('/membership')}>สมาชิก</Link>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link to="/SignupAndEdit" style=
          {{
    backgroundColor:"#F3C623",
    padding: '10px 15px',
    textDecoration: 'none',
    color:'#F5F5F5'
  }}>เพิ่มสมาชิกใหม่</Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
      <div style={{ display: "flex", flexDirection: "column" , marginBottom:"20vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expired" element={<Expired />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/SignupAndEdit" element={<SignupAndEdit />} />
          <Route path="/userInfo/:citizenId" element={<UserInfo />} />
        </Routes>
      </div>
  );
};

export default App;
