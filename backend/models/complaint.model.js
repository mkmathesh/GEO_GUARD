const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    fullName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    phoneNumber: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    date: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    status:{
      type: mongoose.Schema.Types.String,
      required: true,
      default:"pending",
      enum:['pending','inspection','completed']
      
    }
  },
  {
    timestamps: true,
  },
);
const  Complaint = mongoose.model(" Complaint",  complaintSchema);
module.exports = {Complaint };
