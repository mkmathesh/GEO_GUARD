const express=require("express");
const {connectDB}=require("./config/db.js");
require("dotenv").config();
const cors = require("cors");
const {authRoutes}=require("./routes/auth.routes.js");
const {complaintRoutes}=require("./routes/complaint.routes.js");

const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use("/api/auth/",authRoutes);
app.use("/api/complaint/",complaintRoutes);
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    connectDB();
    console.log("Server is running on port http://localhost:"+PORT);
});
