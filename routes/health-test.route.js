const express = require("express");

const TestController = require("../controllers/health-test.controller");

const router = express.Router();

router.post("/health-test", TestController.createNewTest);
router.get("/health-test", TestController.getAllTest);
router.get("/health-test/:id", TestController.getTestByID);
router.patch("/health-test/:id", TestController.updateTest);
router.delete("/health-test/:id", TestController.deleteTest);

module.exports = router;
