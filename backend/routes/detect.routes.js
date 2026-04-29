const express=require("express");
const {CheckDetection}=require("../controllers/detect.controller.js")
const detectRoutes=express.Router();
detectRoutes.post("/check",CheckDetection);
module.exports={detectRoutes};