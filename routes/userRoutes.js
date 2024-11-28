const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
// GET USER ||GET
router.get("/getUser", authMiddleware, getUserController);

// RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

//UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;
