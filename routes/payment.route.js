const express = require("express");
const cors = require("cors");

const PaymentController = require("../controllers/payment.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/payconsultation", cors(corsOptions), PaymentController.postNewPayment);

module.exports = router;