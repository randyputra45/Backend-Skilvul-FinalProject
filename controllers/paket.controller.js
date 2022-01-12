const router = require("express").Router();
const paketModel = require("../models/paket.model");
const Paket = require("../models/paket.model");

class PaketController {
  // POST
  static async postNewPaket(req, res) {
    const newCat = new Paket(req.body);
    try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // GET ALL
  static async getAllPaket(req, res) {
    try {
      const cats = await Paket.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // get by id
  static async getPaketByID(req, res) {
    try {
      const id = req.params.id;

      const paketList = await PaketModel.findOne({
        _id: id,
      });
      res.status(200).send(paketList);
    } catch (Error) {
      res.status(500).send({ err: error });
    }
  }

  // update by id
  static async updatePaket(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const name = body.name;
      const price = body.price;
      const benefit = body.benefit;

      const paketList = await paketModel.updateOne(
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
  static async deletePaket(req, res) {
    try {
      const id = req.params.id;
      await PaketModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = PaketController;
