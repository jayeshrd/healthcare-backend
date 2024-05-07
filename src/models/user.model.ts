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
  labId: {
    type: mongoose.Types.ObjectId,
    // type: String,
    ref: 'labVendor',
    required: false,
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  registeredDate: {
    type: Date,
    default: Date.now, // Stores the timestamp in UTC on user creation
  },
});
export const UserModel = mongoose.model("User", userSchema);

// utils
// export const getUsers = () => UserModel.find();

export const getUsers = async () => {
  // console.log(paymentStatus);
 
  let pipeline = [
    {
      $lookup: {
        from: 'labvendors',
        localField: 'labId',
        foreignField: '_id',
        as: 'labId',
      },
    },
    {
      $project: {
        password: 0,
      },
    },
  ];

  
  let users=await UserModel.aggregate(pipeline);

  return users;
};

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
  

  // export const getUserById = async (id: any) => {
  //   try {
  //     let pipeline = [
  //       {
  //         $match: {
  //           ObjectId: id
  //         }
  //       },
  //       {
  //         $lookup: {
  //           from: 'labvendors',
  //           localField: 'labId',
  //           foreignField: '_id',
  //           as: 'labId',
  //         },
  //       }
  //     ];
  
  //     let user = await UserModel.aggregate(pipeline);
  
  //     if (user.length === 0) {
  //       console.log("No user found with the specified ID");
  //     }
  
  //     return user;
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     throw error; // Re-throw the error for handling it upstream
  //   }
  // };
  // export const getUserById = (id: string) => UserModel.findById(id);
  
  export const getUserById = async (id: string) => {
    try {
      let pipeline = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id) // Assuming you're using Mongoose and need to convert id to ObjectId
          }
        },
        {
          $lookup: {
            from: 'labvendors',
            localField: 'labId', // Assuming labId is the field in UserModel that corresponds to _id in labvendors collection
            foreignField: '_id',
            as: 'labId'
          }
        },
        {
          $project: {
            password: 0
          }
        }
      ];
  
      let user = await UserModel.aggregate(pipeline);
  
      return user;
    } catch (error) {
      console.error(error);
      throw error; // Throw error for handling it in the caller function
    }
  };
  

// export const deleteUserById = (id: string) => UserModel.findByIdAndRemove(id);

export const createUser = (values: Record<string, any>) => {
  let { email, password, firstName, lastName,role,status,labId } = values;
  if (!validateEmail(email) || !validatePassword(password))
    throw new Error("invalid email or password format");
console.log("labid",labId);

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
    labId,
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
    console.log("v11",values);
    
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
