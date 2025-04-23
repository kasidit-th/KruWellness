import React from 'react';
import { ThailandAddressTypeahead } from 'react-thailand-address-typeahead';

const formStep1 = ({ val, handleChange, handleValueChange }) => (
  <ThailandAddressTypeahead value={val} onValueChange={handleValueChange}>
    <div>
      <input placeholder="ชื่อ" value={val.name || ''} onChange={handleChange('name')} />
    </div>
    <div>
      <input placeholder="นามสกุล" value={val.lastname || ''} onChange={handleChange('lastname')} />
    </div>
    <div>
      <input placeholder="ชื่อเล่น" value={val.nickname || ''} onChange={handleChange('nickname')} />
    </div>
    <div>
      <input placeholder="เบอร์โทรศัพท์" value={val.phone || ''} onChange={handleChange('phone')} />
    </div>
    <div>
      <input placeholder="เลขบัตรประชาชน" value={val.citizenId || ''} onChange={handleChange('citizenId')} />
    </div>
    <div>
      <input placeholder="บ้านเลขที่" value={val.houseNumber || ''} onChange={handleChange('houseNumber')} />
    </div>
    <div>
      <input placeholder="หมู่ที่" value={val.moo || ''} onChange={handleChange('moo')} />
    </div>
    <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล" />
    <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ" />
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
      <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
    </div>
    <ThailandAddressTypeahead.Suggestion />
  </ThailandAddressTypeahead>
);

export default formStep1;
