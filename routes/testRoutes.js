const express = require("express");
const { testUserController } = require("../controllers/testController");

//router object
const router = express.Router();

//route GET | POST | UPDATE | DELETE
router.get("/test-user", testUserController);
//export
module.exports = router;
