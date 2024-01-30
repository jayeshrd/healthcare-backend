const {LabVendor} = require('../models')

const createLabVendor = async(labVendorBody:any) =>{
    return LabVendor.create(labVendorBody);
}

module.exports = {
    createLabVendor
}