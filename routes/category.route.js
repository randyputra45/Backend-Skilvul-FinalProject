const express = require("express");

const CategoryController = require("../controllers/category.controller");

// creates a new router instance
const router = express.Router();

// router

router.post("/categories", CategoryController.postNewCategory);
router.get("/categories", CategoryController.getAllCategory);

module.exports = router;