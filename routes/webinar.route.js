const express = require("express");
const cors = require("cors");

const WebinarController = require("../controllers/webinar.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/webinars",cors(corsOptions),  WebinarController.postNewWebinar);
router.get("/webinars", cors(corsOptions), WebinarController.getAllWebinar);
router.get("/webinars/:id", cors(corsOptions), WebinarController.getWebinarByID);
router.put("/webinars/:id", cors(corsOptions), WebinarController.updateWebinar);
router.patch("/webinars/like", cors(corsOptions), WebinarController.likeWebinar);
router.patch("/webinars/unlike", cors(corsOptions), WebinarController.unlikeWebinar);
router.delete("/webinars/:id", cors(corsOptions), WebinarController.deleteWebinar);

module.exports = router;