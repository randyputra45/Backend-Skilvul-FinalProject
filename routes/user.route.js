const express = require("express");

const UserController = require("../controllers/user.controller");

// create a new router instance
const router = express.Router();

// router
router.get("/users", UserController.getAllUser);
router.get("/users/:id", UserController.getUserByID);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
