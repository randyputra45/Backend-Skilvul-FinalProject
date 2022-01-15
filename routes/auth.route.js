const express = require("express");
const cors = require("cors");

const AuthController = require("../controllers/auth.controller");

// creates a new router instance
const router = express.Router();

// important to set cookie 
const corsOptions = {
    origin: ["https://gocure.netlify.app", "http://localhost:3000"],
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post('/register', cors(corsOptions), AuthController.postRegister);
router.post('/login', cors(corsOptions), AuthController.postLogin);
router.get('/verify/:verifyToken', cors(corsOptions), AuthController.getVerify);
router.get('/user', cors(corsOptions), AuthController.getCurrentUser);
router.post('/forgotpassword', cors(corsOptions), AuthController.postForgotPassword);
router.put('/passwordreset/:resetToken', cors(corsOptions), AuthController.putResetPassword);
router.get('/logout', cors(corsOptions), AuthController.getLogout);

module.exports = router;