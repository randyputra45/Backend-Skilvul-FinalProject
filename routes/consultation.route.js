const express = require("express");

const ConsultationController = require("../controllers/consultation.controller");

const router = express.Router();

router.post("/consultation", ConsultationController.createNewConsultation);
router.get("/consultation", ConsultationController.getAllConsultation);
router.get("/consultation/:id", ConsultationController.getConsultationByID);
router.patch("/consultation/:id", ConsultationController.updateConsultation);
router.delete("/consultation/:id", ConsultationController.deleteConsultation);

module.exports = router;
