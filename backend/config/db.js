const mongoose=require("mongoose");
require("dotenv").config();
const connectDB=async()=>{
    try {
        const con=await mongoose.connect(process.env.OFFLINE_MONGO_URI);
        console.log("Database connected successfully✅");
    } catch (error) {
        console.log("❌Database connection Error :"+error);
    }
}
module.exports={connectDB};