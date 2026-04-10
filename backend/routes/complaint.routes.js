const express=require("express");
const {ComplaintRegister,ComplaintView}=require("../controllers/complaint.controller.js");
const complaintRoutes=express.Router();
complaintRoutes.post("/complaintregister",ComplaintRegister);
complaintRoutes.get("/complaintview",ComplaintView);
module.exports={complaintRoutes};