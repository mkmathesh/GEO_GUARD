const { User } = require("../models/user.model.js");
const Register = async (req, res) => {
  try {
    console.log("register");
    const { username, email, password} = req.body;
    const exitstingUser = await User.findOne({ username });
    const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRagex.test(email)) {
      console.log("error: Invaild email format");
      return res
        .status(400)
        .json({ success: false, error: "Invaild email format" });
    }
  
    if (exitstingUser) {
      console.log("error: Username is already taken");
      return res
        .status(400)
        .json({ success: false, error: "Username is already taken" });
    }
     
    const exitstingEmail = await User.findOne({ email });
    if (exitstingEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Email is already taken" });
    }
    const newUser=new User({
      username:username,
      email:email,
      password:password,
    });    
     await newUser.save();
     return res.status(200).json({ success: true, message: "Register successfully!"});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
    
  }
};
const Login = async (req, res) => {
  try {
    console.log("login");
    const { username,password} = req.body;

    const findUser=await User.findOne({username,password});
    console.log(findUser);
    if(!findUser)
    {
       return res
        .status(404)
        .json({ success: false, error: "useranme and password not found" });
    }
    else{
      console.log("login successfully!");
        return res.status(200).json({ success: true, message: "Login successfully!",data:findUser});  
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = { Register, Login };
