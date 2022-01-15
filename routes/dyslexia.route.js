const express = require("express");
const cors = require("cors");

const DyslexiaController = require("../controllers/dyslexia.controller");

// creates a new router instance
const router = express.Router();

// router
router.post("/dyslexia", cors(), DyslexiaController.postNewDyslexia);
router.get("/dyslexia", cors(), DyslexiaController.getAllDyslexia);
router.get("/dyslexia/:id", cors(), DyslexiaController.getDyslexiaByID);
router.patch("/dyslexia/:id", cors(), DyslexiaController.updateDyslexia);
router.delete("/dyslexia/:id", cors(), DyslexiaController.deleteDyslexia);

module.exports = router;