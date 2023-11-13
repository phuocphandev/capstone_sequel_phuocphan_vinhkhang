import express from "express"

import { lockApi } from "../config/jwt.js"
import { getUserInfo, updateUserInfo, userLogin, userRegister } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/register" , userRegister);

userRouter.post("/login", userLogin);

userRouter.put("/update",lockApi, updateUserInfo);

userRouter.get("/user",lockApi, getUserInfo)
