const mongoose=require("mongoose");

const newconnectDB=()=>{
    try {
        const con=mongoose.connect("mongodb://127.0.0.1:27017/saveforest");
        console.log("connect db mongo");
    } catch (error) {
        
    }
}
module.exports={newconnectDB};