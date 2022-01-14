const express = require("express");
const cors = require("cors");

const UserController = require("../controllers/user.controller");

// create a new router instance
const router = express.Router();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.get("/users", cors(), UserController.getAllUser);
router.get("/users/:id", cors(), UserController.getUserByID);
router.patch("/users/:id", cors(), UserController.updateUser);
router.delete("/users/:id", cors(), UserController.deleteUser);

module.exports = router;