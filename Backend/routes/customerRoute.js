import express from "express";
import {addCustomer,updateCustomer} from "../controller/customerController.js";


const customerRouter = express.Router();

customerRouter.post("/add",addCustomer);
customerRouter.put("/update/:id",updateCustomer);

export default customerRouter;