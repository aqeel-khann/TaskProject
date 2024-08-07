const User = require("../model/user")
const bcrypt = require("bcryptjs")
const { tokenGenration } = require("../token/tokenGenration");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();

app.use(cookieParser());
const Signup = async (req, res) => {

    try {
        let password = "123123abc";
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: "user@soft-enterprise.com",
            password: hashPassword,
        });
        await newUser.save();
        res.status(201).json({ msg: "User Created Successfully", data: newUser });

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

const Login = async (req, res) => {
  console.log("login data",req.body)
  try {
    const { email, password } = req.body;
     
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(401).json({ msg: "Password or Email is Incorrect" });
    }
     
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(401).json({msg:"Password or Email is Incorrect"});
    }
     
    const token = tokenGenration(isUser);
    res.cookie("Token", token, { httponly: true, secure: false });
    return res.status(200).json({ msg: "User Login Successfully", token });
  } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
     
  }
};

module.exports={Signup,Login}