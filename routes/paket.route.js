const express = require("express");
const cors = require("cors");

const PaketController = require("../controllers/paket.controller");

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// creates a new router instance
const router = express.Router();

// router

router.post("/package", cors(), PaketController.postNewPaket);
router.get("/package", cors(), PaketController.getAllPaket);
router.get("/package/:id", cors(), PaketController.getPaketByID);
router.patch("/package/:id", cors(), PaketController.updatePaket);
router.delete("/package/:id", cors(), PaketController.deletePaket);

module.exports = router;
