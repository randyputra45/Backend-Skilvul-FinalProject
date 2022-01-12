const express = require("express");

const PaketController = require("../controllers/paket.controller");

// creates a new router instance
const router = express.Router();

// router

router.post("/paket", PaketController.postNewPaket);
router.get("/paket", PaketController.getAllPaket);
router.get("/paket/:id", PaketController.getPaketByID);
router.patch("/paket/:id", PaketController.updatePaket);
router.delete("/paket/:id", PaketController.deletePaket);

module.exports = router;
