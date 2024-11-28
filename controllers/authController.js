const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already registered please login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    return res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password || compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
