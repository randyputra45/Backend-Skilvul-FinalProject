const express = require("express");

const PaymentController = require("../controllers/payment.controller");

// creates a new router instance
const router = express.Router();

// router
router.post("/payconsultation", PaymentController.postNewPayment);

module.exports = router;