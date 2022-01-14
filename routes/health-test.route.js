const express = require("express");
const cors = require("cors");

const TestController = require("../controllers/health-test.controller");

const router = express.Router();
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

router.post("/health-test", cors(), TestController.createNewTest);
router.get("/health-test", cors(), TestController.getAllTest);
router.get("/health-test/:id", cors(), TestController.getTestByID);
router.patch("/health-test/:id", cors(), TestController.updateTest);
router.delete("/health-test/:id", cors(), TestController.deleteTest);

module.exports = router;
