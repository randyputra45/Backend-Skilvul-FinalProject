const express = require("express");

const ScreeningController = require("../controllers/screening.controller");

const router = express.Router();

router.post("/screening", ScreeningController.createNewScreening);
router.get("/screening", ScreeningController.getAllScreening);
router.get("/screening/:id", ScreeningController.getScreeningByID);
router.patch("/screening/:id", ScreeningController.updateScreening);
router.delete("/screening/:id", ScreeningController.deleteScreening);

module.exports = router;
