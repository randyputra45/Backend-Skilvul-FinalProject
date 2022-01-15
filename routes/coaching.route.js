const express = require("express");
const multer = require("../conf/multer");
const cors = require("cors");
const { protect } = require("../middleware/auth")

const CoachingController = require("../controllers/coaching.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: 'https://gocure.netlify.app', //included origin as true
    credentials: true, //included credentials as true
};

// router
router.post("/coaching", multer.single("image"), cors(corsOptions), CoachingController.postNewCoaching);
router.get("/coaching", cors(corsOptions), CoachingController.getAllCoaching);
router.get("/coaching/:id", cors(corsOptions), CoachingController.getCoachingByID);
router.put("/coaching/:id", multer.single("image"), cors(corsOptions), CoachingController.updateCoaching);
router.delete("/coaching/:id", cors(corsOptions), CoachingController.deleteCoaching);

module.exports = router;
