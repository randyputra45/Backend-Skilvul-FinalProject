const express = require("express");
const cors = require("cors");

const PaymentWebinarController = require("../controllers/payment-webinar.controller");

// creates a new router instance
const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.get("/paywebinar", cors(), PaymentWebinarController.getAllWebinar);
router.get("/paywebinar/:id", cors(), PaymentWebinarController.getWebinarByID);
router.post("/paywebinar", cors(), PaymentWebinarController.postWebinarPayment);

module.exports = router;