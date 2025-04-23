import React from 'react';

const StepIndicator = ({ step }) => {
  const steps = ['', '', ''];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div
            style={{
              backgroundColor:
                index < step ? '#F3C623' : index === step ? '#127681' : '#e0e0e0', 
              color: index <= step ? '#fff' : '#000',
              borderRadius: '50%',
              zIndex: 1,
              transition: 'all 0.3s ease',
              width:"40px",
              height:"40px"
            }}
          >
            {label}
          </div>
          {index < steps.length - 1 && (
            <div
              style={{
                height: '4px',
                width: '60px',
                backgroundColor: index < step ? '#F3C623' : '#e0e0e0',
                margin: '0 8px',
                zIndex: 0,
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
