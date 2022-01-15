const express = require("express");
const cors = require("cors");

const ScreeningController = require("../controllers/screening.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/screening", cors(), ScreeningController.createNewScreening);
router.get("/screening", cors(), ScreeningController.getAllScreening);
router.get("/screening/:id", cors(), ScreeningController.getScreeningByID);
router.patch("/screening/:id", cors(), ScreeningController.updateScreening);
router.delete("/screening/:id", cors(), ScreeningController.deleteScreening);

module.exports = router;
