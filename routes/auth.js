const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login-controller");
const registerController = require("../controllers/register-controller");
router.get("/login", loginController.login); // login คือ method ที่ export จากไฟล์ login-controller /login คือได้รับ respon เป็น login จะไปดึงไฟล์ login มาทำงาน
router.get("/register", registerController.register); //.register คือ method ที่ export จากไฟล์ register-controller
router.post("/register", registerController.postRegister)
module.exports = router;