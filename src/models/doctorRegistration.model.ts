const mongoose = require("mongoose");

const doctorRegistrationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    require: false,
  },
  city: {
      type: String,
      required: false,
      default: "",
    
  },
  doctorGender: {
    type: String,
    require: true,
  },
  registrationCouncil: {
      type: String,
      required: false,
      default: "",
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  registrationYear: {
      type: String,
      required: false,
      default: "",
   
  },
  degree: {
      type: String,
      required: false,
      default: "",
    
  },
  institute: {
    type: String,
    required: true,
  },
  yearOfCompletion: {
    type:String
  },

  experience: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

export const doctorRegistration = mongoose.model(
  "doctorRegistrationNew",
  doctorRegistrationSchema
);

export const createDoctor = async (values: Record<string, any>) => {
  let {
    name,
    specialization,
    city,
    doctorGender,
    registrationCouncil,
    registrationNumber,
    registrationYear,
    degree,
    institute,
    yearOfCompletion,
    experience,
    email,
    contactNumber,
  } = values;

  // Check if doctorGender is null or undefined
  if (!doctorGender) {
    throw new Error("Doctor gender is required.");
  }

  try {
    const newDoctor = await doctorRegistration.create({
      name,
      specialization,
      city,
      doctorGender,
      registrationCouncil,
      registrationNumber,
      registrationYear,
      degree,
      institute,
      yearOfCompletion,
      experience,
      email,
      contactNumber,
    });

    return newDoctor.toObject();
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export const getAllDoctorData = () => doctorRegistration.find();
