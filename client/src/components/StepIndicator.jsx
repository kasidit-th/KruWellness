import React from 'react';

const StepIndicator = ({ step }) => {
  const steps = ['ข้อมูลครู', 'เอกสาร', 'ข้อมูลโรงเรียน'];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      {steps.map((label, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            padding: '0.5rem',
            textAlign: 'center',
            backgroundColor: index === step ? '#4caf50' : '#e0e0e0',
            color: index === step ? '#fff' : '#000',
            borderRadius: '4px',
            margin: '0 4px',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
