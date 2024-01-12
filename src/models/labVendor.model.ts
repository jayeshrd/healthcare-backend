const mongoose = require("mongoose");

const labVendorSchema = mongoose.Schema({
  labName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  labServices: {
    type: String,
    required: true,
  },
  labEmail: {
    type: String,
    required: true,
    unique: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
    trim: true,
  },
  licenceNumber: {
    type: String,
    required: true,
  },
  labAvailability: {
    type: String,
    required: true,
  },
  labDocument: {
    type: String,
    required: true,
  },
});
export const labVendor = mongoose.model("labVendor", labVendorSchema);

export const createVendor = async (values: Record<string, any>) => {
  let {
    labName,
    ownerName,
    labServices,
    labEmail,
    qualification,
    logo,
    contactNo,
    licenceNumber,
    labAvailability,
    labDocument,
  } = values;


  try {
    const newLabVendor = await labVendor.create({
      labName,
      ownerName,
      labServices,
      labEmail,
      qualification,
      logo,
      contactNo,
      licenceNumber,
      labAvailability,
      labDocument,
    });


    return newLabVendor.toObject();
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export const getVendors = () => labVendor.find();
//  export const createLabVendor = async(labVendorBody:any) =>{
//   return LabVendor.create(labVendorBody);
// }

// const LabVendor = mongoose.model('labVendor', labVendorSchema);
// module.exports = LabVendor;
