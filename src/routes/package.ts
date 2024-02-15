import { createPackagesController, getAllPackage, updatePackage } from '../controllers/package';
import express from 'express';


export default (router:express.Router) => {
    router.post("/package/register",createPackagesController)
    router.get("/package/getPackage",getAllPackage)
    router.put("/package/update",updatePackage)
}