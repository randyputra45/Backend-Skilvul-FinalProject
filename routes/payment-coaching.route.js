const express = require("express");
const cors = require("cors");

const PaymentCoachingController = require("../controllers/payment-coaching.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.get("/paycoaching/:id", cors(corsOptions), PaymentCoachingController.getCoachingByID);
router.get("/paycoaching", cors(corsOptions), PaymentCoachingController.getAllCoaching);
router.post("/paycoaching", cors(corsOptions), PaymentCoachingController.postCoachingPayment);

module.exports = router;