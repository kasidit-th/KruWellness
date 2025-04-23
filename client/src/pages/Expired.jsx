import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserData from '../components/userData.jsx'; 

const Expired = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    // axios.get(`${baseURL}/csv-data`)
    //   .then(res => {
    //     setData(res.data.data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setError('โหลดข้อมูลล้มเหลว');
    //   });

    const mockData = [
      {
        expired: "เดือน กุมภาพันธ์ ปีพ.ศ. 2568",
        teachers: [
          { id: "8001123456789", nickname: "หนึ่ง", name: "สมชาย ใจดี", image: "https://i.pravatar.cc/150?img=1" },
          { id: "8002123456789", nickname: "สอง", name: "สุดา ศรีสวย", image: "https://i.pravatar.cc/150?img=2" },
          { id: "8003123456789", nickname: "สาม", name: "ปิติพงษ์ บุญมาก", image: "https://i.pravatar.cc/150?img=3" },
          { id: "8004123456789", nickname: "สี่", name: "วันดี สมสุข", image: "https://i.pravatar.cc/150?img=4" },
          { id: "8005123456789", nickname: "ห้า", name: "กานต์ จิตรใจ", image: "https://i.pravatar.cc/150?img=5" }
        ]
      },
      {
        expired: "เดือน มีนาคม ปีพ.ศ. 2568",
        teachers: [
          { id: "8006123456789", nickname: "เอ", name: "อารีย์ แสงทอง", image: "https://i.pravatar.cc/150?img=6" },
          { id: "8007123456789", nickname: "บี", name: "จารุวรรณ ละมุนใจ", image: "https://i.pravatar.cc/150?img=7" },
          { id: "8008123456789", nickname: "ซี", name: "อนันต์ เรืองรอง", image: "https://i.pravatar.cc/150?img=8" },
          { id: "8009123456789", nickname: "ดี", name: "เบญจมาศ รุ่งเรือง", image: "https://i.pravatar.cc/150?img=9" },
          { id: "8010123456789", nickname: "อี", name: "ชัยวัฒน์ กล้าหาญ", image: "https://i.pravatar.cc/150?img=10" }
        ]
      },
      {
        expired: "เดือน เมษายา ปีพ.ศ. 2568",
        teachers: [
          { id: "8011123456789", nickname: "แดง", name: "นิรันดร์ สุขใจ", image: "https://i.pravatar.cc/150?img=11" },
          { id: "8012123456789", nickname: "เขียว", name: "ปาริชาติ ใจเย็น", image: "https://i.pravatar.cc/150?img=12" },
          { id: "8013123456789", nickname: "น้ำเงิน", name: "อุดมพร เก่งกล้า", image: "https://i.pravatar.cc/150?img=13" },
          { id: "8014123456789", nickname: "ชมพู", name: "สุรเดช แสงใส", image: "https://i.pravatar.cc/150?img=14" },
          { id: "8015123456789", nickname: "ม่วง", name: "อัมพร สายใจ", image: "https://i.pravatar.cc/150?img=15" }
        ]
      }
    ];
    setData(mockData);
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserData data={data} />
    </div>
  );

};

export default Expired