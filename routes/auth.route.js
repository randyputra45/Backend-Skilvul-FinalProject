const express = require("express");

const AuthController = require("../controllers/auth.controller");

// creates a new router instance
const router = express.Router();

// router

// router.get('/register', AuthController.getRegister);
router.post('/register', AuthController.postRegister);
// router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
// router.get('/logout', AuthController.getLogout);

module.exports = router;