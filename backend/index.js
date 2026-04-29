const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path=require('path');
const { authRoutes } = require("./routes/auth.routes.js");
const { complaintRoutes } = require("./routes/complaint.routes.js");
const { detectRoutes } = require("./routes/detect.routes.js");

const { connectDB } = require("./config/db.js");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(fileUpload());
app.use("/api/auth/", authRoutes);

app.use("/api/complaint/", complaintRoutes);
app.use("/api/detect/", detectRoutes);


if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  })
}
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port http://localhost:" + PORT);
});
