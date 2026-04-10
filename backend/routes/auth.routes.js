const express=require("express");
const {Register,Login}=require("../controllers/auth.controller.js");
const authRoutes=express.Router();
authRoutes.post("/register",Register);
authRoutes.post("/login",Login);
module.exports={authRoutes};