const express = require("express");
const cors = require("cors");

const PsikologController = require("../controllers/psikolog.controller");

// creates a new router instance
const router = express.Router();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
    exposedHeaders: ["set-cookie"],
};

// router
router.post("/psikolog", cors(corsOptions), PsikologController.createNewPsikolog);
router.get("/psikolog", cors(corsOptions), PsikologController.getAllPsikolog);
router.get("/psikolog/:id", cors(corsOptions), PsikologController.getPsikologByID);
router.patch("/psikolog/:id", cors(corsOptions), PsikologController.updatePsikolog);
router.delete("/psikolog/:id", cors(corsOptions), PsikologController.deletePsikolog);

module.exports = router;
