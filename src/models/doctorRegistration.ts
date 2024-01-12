// const mongoose = require('mongoose');

// const doctorRegistrationSchema = mongoose.Schema({
//   labName: {
//     type: String,
//     required: true,
//   },
//   dob: {
//     type: Date,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   qualification: {
//     type: String,
//     required: true,
//   },
//   uploadPicture: {
//     type: String,
//     required: true,
//   },
//   degree: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   availability: {
//     type: String,
//     required: true,
//   },
//   document: {
//     type: String,
//     required: true,
//   },
 
// });
// export const doctorRegistration = mongoose.model("doctorRegistration", doctorRegistrationSchema);

// export const createVendor = (values: Record<string, any>) => {
//   let { fullName, dob, gender, email,qualification,uploadPicture,degree,category,availability,document } = values;
  
  
//   return new labVendor({
//     fullName, dob, gender, email,qualification,uploadPicture,degree,category,availability,document 
//   })
//     .save()
//     .then((labVendor:any) => labVendor.toObject());
// };

