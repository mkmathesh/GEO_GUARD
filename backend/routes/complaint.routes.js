const express = require("express");
const {
  ComplaintRegister,
  ComplaintView,
  ComplaintUpdate,
} = require("../controllers/complaint.controller.js");
const complaintRoutes = express.Router();
complaintRoutes.post("/complaintregister", ComplaintRegister);
complaintRoutes.get("/complaintview", ComplaintView);
complaintRoutes.put("/complaintupdate/:id", ComplaintUpdate);
module.exports = { complaintRoutes };
