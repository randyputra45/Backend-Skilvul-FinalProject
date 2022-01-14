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
router.get("/users", cors(corsOptions), UserController.getAllUser);
router.get("/users/:id", cors(corsOptions), UserController.getUserByID);
router.patch("/users/:id", cors(corsOptions), UserController.updateUser);
router.delete("/users/:id", cors(corsOptions), UserController.deleteUser);

module.exports = router;