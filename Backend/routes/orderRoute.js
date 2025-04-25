import express from "express";
import { getMyOrder, listOrders, placeOrder, updateStatus } from "../controller/orderController.js";
const orderRouter = express.Router();
orderRouter.post("/place", placeOrder);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/myOrder",getMyOrder)

export default orderRouter;