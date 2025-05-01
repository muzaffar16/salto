import express from "express";
import { loginUser,registerUser,fetchInfo } from "../controller/userController.js";

const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/details",fetchInfo)

export default userRouter;