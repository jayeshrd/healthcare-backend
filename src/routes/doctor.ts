import { createNewDoctor, getAllDoctor } from '../controllers/doctor';
import express from 'express';


export default (router:express.Router) =>{
    router.post("/doctor/register",createNewDoctor)
    router.get("/doctor/getAllDoctor",getAllDoctor)
}