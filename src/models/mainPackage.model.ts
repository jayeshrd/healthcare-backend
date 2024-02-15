import { packages } from "./package.model";

const mongoose = require("mongoose");

const mainPackageSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,

  },
  subTitle: {
    type: String,
    require: true,
    trim: true,
    
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
  description: {
    type: String,
    require: false,
  },
});

export const mainPackage = mongoose.model("mainPackage", mainPackageSchema);

export const createMainPackage = async (values:any) => {
  try {
    const { title, subTitle, price, discount, description } = values;

    // Create the main package
    const newMainPackage = await mainPackage.create({
      title, subTitle, price, discount, description 
    });

    // Update packages collection with new content
    const result = await packages.updateOne(
      { title: title },
      {
        $push: {
          contents: {
            title: subTitle,
            href: "hh.com",
          },
        },
      },
      { new: true } // Returns the modified document
    );

    // Log the title and result of the update
    console.log(`Updated title: ${title}, Update result:`, result);

    // Return the newly created main package
    return newMainPackage.toObject();
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating or updating package:", error);
    throw error; // Propagate the error
  }
};


export const getAllmainPackage = () => mainPackage.find();

export const updatemainPackages = (id:string,values:any) =>
mainPackage.findByIdAndUpdate(id,values,{new:true})


export const deletePackageDb = async (id:string) =>{
  try {
    const deletePackageById = await mainPackage.findByIdAndDelete(id)
    if (!deletePackageById) {
      throw new Error("Package not found");
    } 
    return deletePackageById
  } catch (error) {
    
  }
}