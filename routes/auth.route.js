const express = require("express");

const AuthController = require("../controllers/auth.controller");

// creates a new router instance
const router = express.Router();

// router

router.post('/register', AuthController.postRegister);
router.get('/verify/:verifyToken', AuthController.getVerify);
router.post('/login', AuthController.postLogin);
router.post('/forgotpassword', AuthController.postForgotPassword);
router.put('/passwordreset/:resetToken', AuthController.putResetPassword);

module.exports = router;