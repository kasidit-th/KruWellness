import React from 'react';

const formStep3 = ({ val, setVal }) => (
  <div>
    <h3>ข้อมูลสมาชิกเพิ่มเติม</h3>
    <input
      placeholder="ตำแหน่งในกลุ่ม"
      value={val.role || ''}
      onChange={(e) => setVal({ ...val, role: e.target.value })}
    />
    <input
      placeholder="วันเริ่มเป็นสมาชิก"
      type="date"
      value={val.startDate || ''}
      onChange={(e) => setVal({ ...val, startDate: e.target.value })}
    />
  </div>
);

export default formStep3;
