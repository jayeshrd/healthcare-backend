const mongoose = require("mongoose");
import { promisify } from "util";

// Assuming you have the packages model defined somewhere
// import packages from './package';

const packagesSchema = mongoose.Schema({
  title: {
    type: String,
    required: false,
    default: "",
  },
  imgurl: {
    type: String,
    required: false,
    default: "",
  },
  href: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  contents: [
    {
      title: {
        type: String,
        required: false,
        default: "",
      },
      href: {
        type: String,
        required: false,
        default: "",
      },
    },
  ],
});
export const packages = mongoose.model("packages", packagesSchema);

export const createPackages = async (values: Record<string, any>) => {
  let { title, imgurl, href, description, contents } = values;

  try {
    const newPackages = await packages.create({
      title,
      imgurl,
      href,
      description,
      contents,
    });

    return newPackages.toObject();
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
};

export const getPackage = () => packages.find();

// const updateOneAsync = promisify(packages.updateOne.bind(packages));
const updateOneAsync = promisify(packages.updateOne.bind(packages));

export const updatePackageDb = async (
  title: string,
  values: Record<string, any>
) => {
  try {
    const result = await packages.updateOne(
      { title: title },
      {
        $push: {
          contents: {
            title: values.contents.title,
            href: values.contents.href,
          },
        },
      },
      { new: true }
    );
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err; // Propagate the error
  }
};

// export const updatePackageDb = (id: string, values: Record<string, any>) =>
//   packages.findByIdAndUpdate(id, values, { new: true });

// const mongoose = require("mongoose");

// const packagesSchema = mongoose.Schema({
//   category: {
//     type: String,
//     required: true,
//   },
//   subCategory: {
//     type: String,
//     required: true,
//   },
//   packageName: {
//     type: String,
//     required: true,
//   },
//   packageDescription: {
//     type: String,
//     required: true,

//   },
//   packageUrl: {
//     type: String,
//     required: true,
//   },

// });
// export const packages = mongoose.model("packages", packagesSchema);

// export const createPackages = async (values: Record<string, any>) => {
//   let {
//     category,
//     subCategory,
//     packageName,
//     packageDescription,
//     packageUrl,
//   } = values;

//   try {
//     const newPackages = await packages.create({
//         category,
//         subCategory,
//         packageName,
//         packageDescription,
//         packageUrl,
//     });

//     return newPackages.toObject();
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     throw error; // Rethrow the error for the calling code to handle
//   }
// };

// export const getPackage = () => packages.find();

// export const updatePackageDb = (id: string, values: Record<string, any>) =>
//   packages.findByIdAndUpdate(id, values,{ new: true });

// // export const updateVendorDb = (id: string, values: Record<string, any>) =>
// //   labVendor.findByIdAndUpdate(id, values, { new: true });
