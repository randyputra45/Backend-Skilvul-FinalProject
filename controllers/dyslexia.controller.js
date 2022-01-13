const router = require("express").Router();
const dyslexiaModel = require("../models/dyslexia.model");
const Dyslexia = require("../models/dyslexia.model");

class DyslexiaController {
  //post
  static async postNewDyslexia(req, res) {
    const newCat = new Dyslexia(req.body);
    try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get all
  static async getAllDyslexia(req, res) {
    try {
      const cats = await Dyslexia.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get by id
  static async getDyslexiaByID(req, res) {
    try {
      const id = req.params.id;

      const dyslexiaList = await DyslexiaModel.findOne({
        _id: id,
      });
      res.status(200).send(dyslexiaList);
    } catch (Error) {
      res.status(500).send({ err: error });
    }
  }

  //update by id
  static async updateDyslexia(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const name = body.name;
      const price = body.price;
      const benefit = body.benefit;

      const dyslexiaList = await dyslexiaModel.updateOne(
        { _id: id },
        {
          name: name,
          price: price,
          benefit: benefit,
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  //delete by id
  static async deleteDyslexia(req, res) {
    try {
      const id = req.params.id;
      await DyslexiaModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = DyslexiaController;
