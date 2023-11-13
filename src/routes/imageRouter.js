import express from "express";
import { deleteImage, getCheckImage, getCommentByIdImage, getCreatedImage, getDetailImage, getImagesList, getImagesListByName, getSavedImage, postCommentImage, postImage, saveImage } from "../controllers/imageController.js";
import { lockApi } from "../config/jwt.js";

export const imageRouter = express.Router()
imageRouter.get("/get-images-list",lockApi, getImagesList)

imageRouter.get("/get-images-list-by-name",lockApi, getImagesListByName)

imageRouter.get("/detail-Image/:imageId" ,lockApi, getDetailImage)

imageRouter.get("/comment-Image/:imageId" ,lockApi, getCommentByIdImage)

imageRouter.get("/check-Image/:imageId" ,lockApi, getCheckImage)

imageRouter.post("/save-image/:idImage",lockApi,saveImage)

imageRouter.post("/post-comment-Image/:imageId" ,lockApi, postCommentImage)

imageRouter.get("/saved-image/:userId",lockApi, getSavedImage)

imageRouter.get("/created-image/:userId",lockApi, getCreatedImage)

imageRouter.delete("/delete-image/:imageId",lockApi, deleteImage)

imageRouter.post("/",lockApi, postImage)