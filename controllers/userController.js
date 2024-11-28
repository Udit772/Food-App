const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//GET USER INFO
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

//UPDATE USER
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
      error,
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all field",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "PASSWORD RESET SUCCESSFUL",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
};
