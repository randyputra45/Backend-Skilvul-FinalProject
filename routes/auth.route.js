const express = require("express");
const cors = require("cors");

const AuthController = require("../controllers/auth.controller");

// creates a new router instance
const router = express.Router();

// router

router.post('/register', cors(), AuthController.postRegister);
router.post('/login', cors(), AuthController.postLogin);
router.get('/verify/:verifyToken', cors(), AuthController.getVerify);
router.get('/user', cors(), AuthController.getCurrentUser);
router.post('/forgotpassword', cors(), AuthController.postForgotPassword);
router.put('/passwordreset/:resetToken', cors(), AuthController.putResetPassword);
router.get('/logout', cors(), AuthController.getLogout);

module.exports = router;