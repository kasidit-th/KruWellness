import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';

const UserData = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filterTeachers = (teachers) => {    
    return teachers.filter((teacher) => {
      const keyword = searchTerm.toLowerCase();
      return (
        teacher.id?.toLowerCase().includes(keyword) ||
        teacher.nickname?.toLowerCase().includes(keyword) ||
        teacher.name?.toLowerCase().includes(keyword) 
      );
    });
  };

  const formatId = (id) => {
    if (!id || id.length !== 13) return id;
    return `${id[0]}-${id.slice(1, 5)}-${id.slice(5, 10)}-${id.slice(10, 12)}-${id[12]}`;
  };

  return (
    <div>
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {data?.length > 0 ? (
        data.map((schoolData, index) => {
          const filteredTeachers = filterTeachers(schoolData.teachers);
          if (filteredTeachers.length === 0) return null; 

          return (
            <div key={index} style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', backgroundColor: "#127681", color: "#F5F5F5", padding: "10px", margin: "0" }}>
                  {
                    schoolData.school
                    ? schoolData.school
                    : schoolData.expired
                    ? schoolData.expired
                    : schoolData.membership
                    ? schoolData.membership
                    :`เกิดข้อผิดพลาด`
                  }
                </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px' }}>
                {filteredTeachers.map((teacher) => (
                  <div onClick={() => navigate(`/userInfo/${teacher.id}`)} key={teacher.id} className='ListContainer'>
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      style={{ width: '160px', height: '160px' }}
                    />
                    <p><strong>ครู {teacher.nickname}</strong></p>
                    <p>{teacher.name}</p>
                    <p>{formatId(teacher.id)}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ color: '#000000' }}>--ไม่พบข้อมูล--</p>
      )}
    </div>
  );
};

export default UserData;
