const express = require("express");
const cors = require("cors");
const multer = require("../conf/multer");

const PsikologController = require("../controllers/psikolog.controller");

// creates a new router instance
const router = express.Router();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/experts", cors(), PsikologController.createNewPsikolog);
router.get("/experts", cors(), PsikologController.getAllPsikolog);
router.get("/experts/:id", cors(), PsikologController.getPsikologByID);
router.put("/experts/:id", multer.single("image"), cors(), PsikologController.updatePsikolog);
router.delete("/experts/:id", cors(), PsikologController.deletePsikolog);

module.exports = router;