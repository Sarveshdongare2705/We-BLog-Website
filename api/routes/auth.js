import express from "express";
import mysql from "mysql";
import { login, logout, register } from "../controllers/auth.js";

//we can make any request using this router
const router = express.Router()

//register
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

export default router