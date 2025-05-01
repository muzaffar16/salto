import express from "express";
import {addDeliveryDetails,getDeliveryDetailsByEmail} from "../controller/deliveryController.js";


const customerRouter = express.Router();

customerRouter.post("/add",addDeliveryDetails);
customerRouter.get("/deliveryDetails", getDeliveryDetailsByEmail);


export default customerRouter;


