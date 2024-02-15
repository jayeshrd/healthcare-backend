import mongoose from "mongoose";
import { random, authentication } from "../utils/auth";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
    default:"user"
  },
  status: {
    type: String,
    require: true,
    default:"Active"
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});
export const UserModel = mongoose.model("User", userSchema);

// utils
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) => UserModel.findById(id);
// export const deleteUserById = (id: string) => UserModel.findByIdAndRemove(id);

export const createUser = (values: Record<string, any>) => {
  let { email, password, firstName, lastName,role,status } = values;
  if (!validateEmail(email) || !validatePassword(password))
    throw new Error("invalid email or password format");

  firstName = firstName.trim();
  lastName = lastName.trim();
  const salt = random();
  return new UserModel({
    firstName,
    lastName,
    email,
    role,
    status,
    authentication: {
      salt,
      password: authentication(salt, password),
    },
  })
    .save()
    .then((user) => user.toObject());
};

// export const updateUserData = async (id: string, values: Record<string, any>) => {
//   try {
//     const updatedUser = await UserModel.findByIdAndUpdate(id, values, { new: true });
// console.log(values);

//     // Log the updated values
//     console.log('Updated User Data:', updatedUser);
    
//     return updatedUser; // Optional: Return the updated user data
//   } catch (error) {
//     console.error('Error updating user data:', error);
//     throw error; // Optional: Rethrow the error or handle it as needed
//   }
// };


export const updateUserData = async (id: string, values: Record<string, any>) => {
  try {
    if (values.password) {
      // If password is provided in the values, update password
      if (!validatePassword(values.password)) {
        throw new Error("Invalid password format");
      }
      if (!validateEmail(values.email)) {
        throw new Error("Invalid email format");
      }
      const salt = random();
      values.authentication = {
        salt,
        password: authentication(salt, values.password),
      };
      delete values.password; // Remove plain password from values
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, values, { new: true });

    // Log the updated values
    console.log('Updated User Data:', updatedUser);

    return updatedUser; // Optional: Return the updated user data
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Optional: Rethrow the error or handle it as needed
  }
};


// extra utils
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};
const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return passwordRegex.test(password);
};
