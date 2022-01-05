const express = require("express");
const cors = require("cors");

const WebinarController = require("../controllers/webinar.controller");

// creates a new router instance
const router = express.Router();

// router
router.post("/webinars", WebinarController.postNewWebinar);
router.get("/webinars", WebinarController.getAllWebinar);
router.get("/webinars/:id", WebinarController.getWebinarByID);
router.put("/webinars/:id", WebinarController.updateWebinar);
router.patch("/webinars/like", WebinarController.likeWebinar);
router.patch("/webinars/unlike", WebinarController.unlikeWebinar);
router.delete("/webinars/:id", WebinarController.deleteWebinar);

module.exports = router;