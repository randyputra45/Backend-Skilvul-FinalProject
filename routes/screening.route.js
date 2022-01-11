const express = require("express");
const cors = require("cors");

const ScreeningController = require("../controllers/screening.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/screening", cors(corsOptions), ScreeningController.createNewScreening);
router.get("/screening", cors(corsOptions), ScreeningController.getAllScreening);
router.get("/screening/:id", cors(corsOptions), ScreeningController.getScreeningByID);
router.patch("/screening/:id", cors(corsOptions), ScreeningController.updateScreening);
router.delete("/screening/:id", cors(corsOptions), ScreeningController.deleteScreening);

module.exports = router;
