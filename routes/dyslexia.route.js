const express = require("express");

const DyslexiaController = require("../controllers/dyslexia.controller");

// creates a new router instance
const router = express.Router();

// router

router.post("/dyslexia", DyslexiaController.postNewDyslexia);
router.get("/dyslexia", DyslexiaController.getAllDyslexia);
router.get("/dyslexia/:id", DyslexiaController.getDyslexiaByID);
router.patch("/dyslexia/:id", DyslexiaController.updateDyslexia);
router.delete("/dyslexia/:id", DyslexiaController.deleteDyslexia);

module.exports = router;
