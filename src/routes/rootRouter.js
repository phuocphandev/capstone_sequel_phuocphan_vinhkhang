import express from "express";
import { userRouter } from "./userRouter";
import { imageRouter } from "./imageRouter";

export const rootRouter = express.Router()

rootRouter.use("/user", userRouter)
rootRouter.use("/image", imageRouter)