import React, { useState } from 'react';
import axios from 'axios';
import StepIndicator from '../components/StepIndicator';
import FormStep1 from '../components/formStep1';
import FormStep2 from '../components/formStep2';
import FormStep3 from '../components/formStep3';

const SignupAndEdit = ({ memberData, isEditMode }) => {
  const [step, setStep] = useState(0);
  const [val, setVal] = useState(memberData || {});

  const handleValueChange = (newVal) => {
    console.log(val);
    setVal({ ...val, ...newVal });
  };

  const handleChange = (field) => (e) => {
    console.log(val);
    setVal({ ...val, [field]: e.target.value });
  };

  const next = () => setStep((prev) => Math.min(prev + 1, 2));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    console.log(val);
    try {
      const apiUrl = isEditMode ? '/api/members/edit' : '/api/members/create';
      const formData = new FormData();
      
      Object.keys(val).forEach((key) => {
        formData.append(key, val[key]);
      });

      if (val.file) {
        formData.append('file', val.file);
      }

      await axios.post(apiUrl, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      alert('ส่งข้อมูลเรียบร้อยแล้ว!');
      console.log(val);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };

  return (
    <div style={{ margin: '0% 10%' }}>
      <StepIndicator step={step} />
      {step === 0 && <FormStep1 val={val} handleChange={handleChange} handleValueChange={handleValueChange} />}
      {step === 1 && <FormStep2 val={val} setVal={setVal} />}
      {step === 2 && <FormStep3 val={val} setVal={setVal} />}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        {step > 0 && <button onClick={prev}>ย้อนกลับ</button>}
        {step < 2 ? (
          <button onClick={next}>ถัดไป</button>
        ) : (
          <button onClick={handleSubmit}>ส่งข้อมูล</button>
        )}
      </div>
    </div>
  );
};

export default SignupAndEdit;
