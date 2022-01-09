const express = require("express");
const cors = require("cors");

const ConsultationController = require("../controllers/consultation.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/consultation", cors(corsOptions), ConsultationController.createNewConsultation);
router.get("/consultation", cors(corsOptions), ConsultationController.getAllConsultation);
router.get("/consultation/:id", cors(corsOptions), ConsultationController.getConsultationByID);
router.patch("/consultation/:id", cors(corsOptions), ConsultationController.updateConsultation);
router.delete("/consultation/:id", cors(corsOptions), ConsultationController.deleteConsultation);

module.exports = router;
