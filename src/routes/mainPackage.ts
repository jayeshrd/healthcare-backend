import { createMainPackages, deletePackageById, getAllmainPackages, updatemainPackage ,getmainPackages} from '../controllers/mainPackage';
import express from 'express';

export default (router:express.Router)=>{
    router.post('/mainPackage/register',createMainPackages),
    router.get('/mainPackage/getAllmainPackage',getAllmainPackages),
    router.get('/mainPackage/:id',getmainPackages),
    router.put("/mainPackage/updatePackage/:id",updatemainPackage),
    router.delete('/mainPackage/deletePackage/:id',deletePackageById)
}