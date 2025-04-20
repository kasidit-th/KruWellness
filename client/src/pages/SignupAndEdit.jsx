import React, { useState } from 'react';
import Form from '../components/Form';


const SignupAndEdit = () => {
    const [val, setVal] = useState({});

  return (
    <div>

       <h1>หน้าแรก</h1>
            <Form val={val} setVal={setVal} />
            <div>
              <h3>Selected Address:</h3>
              <p>Subdistrict: {val?.subdistrict}</p>
              <p>District: {val?.district}</p>
              <p>Province: {val?.province}</p>
              <p>Postal Code: {val?.postalCode}</p>
            </div>
    </div>
  );
};

export default SignupAndEdit;
