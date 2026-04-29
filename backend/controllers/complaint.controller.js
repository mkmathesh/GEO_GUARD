const { Complaint } = require("../models/complaint.model.js");

const ComplaintRegister = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, location, description, date } =
      req.body;
    const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRagex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invaild email format" });
    }
    const newComplaint = new Complaint({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      location: location,
      description: description,
      date: date,
    });
    await newComplaint.save();
    return res
      .status(200)
      .json({ success: true, message: "Complaint Register successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const ComplaintView = async (req, res) => {
  try {
    const complaint = await Complaint.find();
    return res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
const ComplaintUpdate = async (req, res) => {
  try {
    console.log(1);
    const updateId = req.params.id;
    const data = req.body;
    const update = await Complaint.findByIdAndUpdate(updateId, data);
    res.status(200).json({ success: true, message: "update successfully" });
  } catch (error) {}
};
module.exports = { ComplaintRegister, ComplaintView, ComplaintUpdate };
