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
router.post("/webinars",cors(),  WebinarController.postNewWebinar);
router.get("/webinars", cors(), WebinarController.getAllWebinar);
router.get("/webinars/:id", cors(), WebinarController.getWebinarByID);
router.put("/webinars/:id", cors(), WebinarController.updateWebinar);
router.patch("/webinars/like", cors(), WebinarController.likeWebinar);
router.patch("/webinars/unlike", cors(), WebinarController.unlikeWebinar);
router.delete("/webinars/:id", cors(), WebinarController.deleteWebinar);

module.exports = router;