const express = require("express");
const cors = require("cors");

const AuthController = require("../controllers/auth.controller");

// creates a new router instance
const router = express.Router();

// router

router.post('/register', cors(), AuthController.postRegister);
router.get('/verify/:verifyToken', cors(), AuthController.getVerify);
router.post('/login', cors(), AuthController.postLogin);
router.post('/forgotpassword', cors(), AuthController.postForgotPassword);
router.put('/passwordreset/:resetToken', cors(), AuthController.putResetPassword);

module.exports = router;