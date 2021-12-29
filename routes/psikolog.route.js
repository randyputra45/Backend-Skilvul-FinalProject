const express = require("express");

const PsikologController = require("../controllers/psikolog.controller");

// creates a new router instance
const router = express.Router();

// router
router.post("/psikolog", PsikologController.createNewPsikolog);
router.get("/psikolog", PsikologController.getAllPsikolog);
router.get("/psikolog/:id", PsikologController.getPsikologByID);
router.patch("/psikolog/:id", PsikologController.updatePsikolog);
router.delete("/psikolog/:id", PsikologController.deletePsikolog);

module.exports = router;
