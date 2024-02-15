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
  labServices: [
    {
      value: {
        type: String,
        required: false,
        default: "",
      },
      label: {
        type: String,
        required: false,
        default: "",
      },
    },
  ],
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
  // labAvailability: {
  //   type: String,
  //   required: true,
  // },
  labAvailability: [
    {
      day: {
        type: String,
        required: true,
        default: "",
      },
      from: {
        type: String,
        required: false,
        default: "",
      },
      to: {
        type: String,
        required: false,
        default: "",
      },
    },
  ],
  labDocument: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  remark: {
    type: String,
    default: " ",
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
    remark,
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
      remark,
    });

    return newLabVendor.toObject();
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export const getVendors = () => labVendor.find();

// export const updateVendorDb = (id: string, values: Record<string, any>) =>
//   labVendor.findByIdAndUpdate(id, values);

export const updateVendorDb = (id: string, values: Record<string, any>) =>
  labVendor.findByIdAndUpdate(id, values, { new: true });

export const deleteVendorById = async (id: string) => {
  try {
    const deletedVendor = await labVendor.findByIdAndDelete(id);
    if (!deletedVendor) {
      throw new Error("Vendor not found");
    }
    return deletedVendor;
  } catch (error) {
    throw new Error(`Failed to delete vendor: ${error.message}`);
  }
};

//  export const createLabVendor = async(labVendorBody:any) =>{
//   return LabVendor.create(labVendorBody);
// }

// const LabVendor = mongoose.model('labVendor', labVendorSchema);
// module.exports = LabVendor;
