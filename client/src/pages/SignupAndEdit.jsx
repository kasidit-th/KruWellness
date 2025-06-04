import React, { useState } from "react";
import axios from "axios";
import StepIndicator from "../components/StepIndicator";
import FormStep1 from "../components/formStep1";
import FormStep2 from "../components/formStep2";
import FormStep3 from "../components/formStep3";
import { useNavigate } from "react-router-dom";

const SignupAndEdit = ({ memberData, isEditMode }) => {
  const [step, setStep] = useState(0);
  const [val, setVal] = useState(memberData || {});
  const navigate = useNavigate();

  const excludedKeys = ["district", "postalCode", "province", "subdistrict"];

  const handleValueChange = (newVal) => {
    const filtered = Object.fromEntries(
      Object.entries(newVal).filter(([key]) => !excludedKeys.includes(key))
    );
    console.log(val);
    setVal({ ...val, ...filtered });
  };

  const handleChange = (field) => (e) => {
    if (excludedKeys.includes(field)) return;

    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setVal({ ...val, [field]: value });
  };

  const next = () => setStep((prev) => Math.min(prev + 1, 2));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    console.log(val);
    try {
      const apiUrl = isEditMode ? "/api/members/edit" : "/api/members/create";
      const formData = new FormData();

      Object.keys(val).forEach((key) => {
        formData.append(key, val[key]);
      });

      if (val.file) {
        formData.append("file", val.file);
      }

      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("ส่งข้อมูลเรียบร้อยแล้ว!");
      console.log(val);
      navigate(`/userInfo/${val.citizenId}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  return (
    <div style={{ margin: "0% 5%" }}>
      <StepIndicator step={step} />
      {step === 0 && (
        <FormStep1
          val={val}
          handleChange={handleChange}
          handleValueChange={handleValueChange}
        />
      )}
      {step === 1 && <FormStep2 val={val} setVal={setVal} />}
      {step === 2 && (
        <FormStep3
          val={val}
          setVal={setVal}
          handleChange={handleChange}
          handleValueChange={handleValueChange}
        />
      )}

      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "end" }}
      >
        {step > 0 && (
          <button className="button" onClick={prev}>
            ย้อนกลับ
          </button>
        )}
        {step < 2 ? (
          <button className="button" onClick={next}>
            ถัดไป
          </button>
        ) : (
          <button className="button" onClick={handleSubmit}>
            ส่งข้อมูล
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupAndEdit;
