import express from "express";
import { userRouter } from "./userRouter.js";
import { ImageRouter } from "./ImageRouter.js";

export const rootRouter = express.Router()

rootRouter.use("/user", userRouter)
rootRouter.use("/image", ImageRouter)