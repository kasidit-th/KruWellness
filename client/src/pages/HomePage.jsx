import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserData from '../components/userData.jsx'; 

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");

  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${baseURL}/api/users`)
      .then(res => {
        setData(res.data);
        console.log(res.data);
        
      })
      .catch(err => {
        console.error(err);
        setError('โหลดข้อมูลล้มเหลว');
      });
  }, [keyword]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserData data={data} setKeyword={setKeyword} />
    </div>
  );
};

export default HomePage;
