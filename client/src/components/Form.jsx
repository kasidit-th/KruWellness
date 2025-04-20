import React from 'react';
import { ThailandAddressTypeahead } from 'react-thailand-address-typeahead';

const Form = ({ val, setVal }) => {
  return (
    <div>
      <h2>กรอกที่อยู่</h2>
      <ThailandAddressTypeahead
        value={val}
        onValueChange={(newVal) => {
          console.log("New Value: ", newVal);
          setVal(newVal);
        }}
      >
        <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล" value={val.subdistrict} />
        <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ" value={val.district} />
        <div>
          <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" value={val.province} />
          <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" value={val.postalCode} />
        </div>
        <ThailandAddressTypeahead.Suggestion />
      </ThailandAddressTypeahead>
    </div>
  );
};

export default Form;
