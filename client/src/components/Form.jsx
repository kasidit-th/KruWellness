// import React from 'react';
// import { ThailandAddressTypeahead } from 'react-thailand-address-typeahead';

// const Form = ({ val, setVal }) => {
//   const handleValueChange = (newVal) => {
//     setVal({ ...val, ...newVal });
//   };

//   const handleChange = (field) => (e) => {
//     setVal({ ...val, [field]: e.target.value });
//     console.log(val);
    
//   };

//   return (
//     <div>
//       <h2>กรอกที่อยู่</h2>
//       <ThailandAddressTypeahead value={val} onValueChange={handleValueChange}>
//         <div>
//           <input
//             type="text"
//             placeholder="ชื่อ"
//             value={val.name || ''}
//             onChange={handleChange('name')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="นามสกุล"
//             value={val.lastname || ''}
//             onChange={handleChange('lastname')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="ชื่อเล่น"
//             value={val.nickname || ''}
//             onChange={handleChange('nickname')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="เบอร์โทรศัพท์"
//             value={val.phone || ''}
//             onChange={handleChange('phone')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="เลขบัตรประชาชน"
//             value={val.citizenId || ''}
//             onChange={handleChange('citizenId')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="บ้านเลขที่"
//             value={val.houseNumber || ''}
//             onChange={handleChange('houseNumber')}
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="หมู่ที่"
//             value={val.moo || ''}
//             onChange={handleChange('moo')}
//           />
//         </div>

//         <ThailandAddressTypeahead.SubdistrictInput placeholder="ตำบล" />
//         <ThailandAddressTypeahead.DistrictInput placeholder="อำเภอ" />
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <ThailandAddressTypeahead.ProvinceInput placeholder="จังหวัด" />
//           <ThailandAddressTypeahead.PostalCodeInput placeholder="รหัสไปรษณีย์" />
//         </div>
//         <ThailandAddressTypeahead.Suggestion />
//       </ThailandAddressTypeahead>
//     </div>
//   );
// };

// export default Form;
