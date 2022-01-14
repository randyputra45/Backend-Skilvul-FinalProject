const express = require("express");
const cors = require("cors");

const ConsultationController = require("../controllers/payment-consultation.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/consultation", cors(), ConsultationController.createNewConsultation);
router.post("/payconsultation", cors(), ConsultationController.postNewPayment);
router.get("/consultation", cors(), ConsultationController.getAllConsultation);
router.get("/paymentstatus", ConsultationController.getPaymentStatus);
router.get("/consultation/:id", cors(), ConsultationController.getConsultationByID);
router.patch("/consultation/:id", cors(), ConsultationController.updateConsultation);
router.delete("/consultation/:id", cors(), ConsultationController.deleteConsultation);

module.exports = router;