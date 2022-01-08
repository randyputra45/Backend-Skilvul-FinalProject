const express = require("express");

const TestController = require("../controllers/test.controller");

const router = express.Router();

router.post("/test", TestController.createNewTest);
router.get("/test", TestController.getAllTest);
router.get("/test/:id", TestController.getTestByID);
router.patch("/test/:id", TestController.updateTest);
router.delete("/test/:id", TestController.deleteTest);

module.exports = router;
