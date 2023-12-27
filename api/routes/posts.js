import express from "express";
import mysql from "mysql";
import {getPosts,getPost,addPost,deletePost,updatePost, getMenu, changeLike, likeValue } from "../controllers/post.js"

//we can make any request using this router
const router = express.Router()

router.get("/",getPosts)
router.get("/:id",getPost)
router.get("/:cat/:id", getMenu);
router.post("/",addPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)

router.post("/likepost/:id" , changeLike)
router.get("/likecount/:id", likeValue)

export default router;