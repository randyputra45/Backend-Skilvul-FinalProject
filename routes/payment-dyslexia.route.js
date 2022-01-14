const express = require("express");
const cors = require("cors");

const PaymentDyslexiaController = require("../controllers/payment-dyslexia.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.get("/paydyslexia", cors(corsOptions), PaymentDyslexiaController.getAllDyslexia);
router.get("/paydyslexia/:id", cors(corsOptions), PaymentDyslexiaController.getDyslexiaByID);
router.post("/paydyslexia", cors(corsOptions), PaymentDyslexiaController.postDyslexiaPayment);

module.exports = router;