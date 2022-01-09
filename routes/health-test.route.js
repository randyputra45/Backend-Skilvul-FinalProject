const express = require("express");
const cors = require("cors");

const TestController = require("../controllers/health-test.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/health-test", cors(corsOptions), TestController.createNewTest);
router.get("/health-test", cors(corsOptions), TestController.getAllTest);
router.get("/health-test/:id", cors(corsOptions), TestController.getTestByID);
router.patch("/health-test/:id", cors(corsOptions), TestController.updateTest);
router.delete("/health-test/:id", cors(corsOptions), TestController.deleteTest);

module.exports = router;
