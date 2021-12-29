const router = require("express").Router();
const Category = require("../models/category.model");

class CategoryController {
  // POST
  static async postNewCategory(req, res) {
    const newCat = new Category(req.body);
    try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // GET ALL
  static async getAllCategory(req, res) {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CategoryController;
