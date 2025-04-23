import React from 'react';

const formStep2 = ({ val, setVal }) => (
  <div>
    <h3>อัปโหลดเอกสาร</h3>
    <input
      type="file"
      onChange={(e) => setVal({ ...val, file: e.target.files[0] })}
    />
  </div>
);

export default formStep2;
