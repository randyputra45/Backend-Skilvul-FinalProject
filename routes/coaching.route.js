const express = require("express");
const multer = require("../conf/multer");
const cors = require("cors");
const { protect } = require("../middleware/auth")

const CoachingController = require("../controllers/coaching.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/coaching", multer.single("image"), cors(), CoachingController.postNewCoaching);
router.get("/coaching", cors(), CoachingController.getAllCoaching);
router.get("/coaching/:id", cors(), CoachingController.getCoachingByID);
router.put("/coaching/:id", multer.single("image"), cors(), CoachingController.updateCoaching);
router.delete("/coaching/:id", protect, CoachingController.deleteCoaching);

module.exports = router;
