import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CsvViewer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  
  const isProduction = process.env.NODE_ENV === 'production';
  const baseURL = isProduction ? 'http://localhost:5000' : 'http://localhost:5000';
  

  
  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseURL}/csv-data`)
      .then(res => {
          setData(res.data);
          setError(null);
        })
        .catch(err => {
          console.error(err);
          setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        });
    };
  
    if (process.env.NODE_ENV === 'production') {
      setTimeout(fetchData, 1000); 
    } else {
      fetchData();
    }
  }, [baseURL]);
  

  return (
    <div style={{ padding: '2rem' }}>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <h2>CSV Data from Server</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CsvViewer;
