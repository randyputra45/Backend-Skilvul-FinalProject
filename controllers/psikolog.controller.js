const PsikologModel = require("../models/psikolog.model");

class PsikologController {
  static async createNewPsikolog(req, res) {
    // todo: get `name` from req body
    // create a new artis object
    // save to db
    try {
      const newPsikolog = new PsikologModel(req.body);
      const saved = await newPsikolog.save();
      res.status(201).json({
          message: "New psikolog added",
          psikolog: saved
      });
      res.status(201).send(saved);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllPsikolog(req, res) {
    try {
      const psikologList = await PsikologModel.find();
      res.status(200).send(psikologList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getPsikologByID(req, res) {
    try {
      const id = req.params.id;

      const psikologList = await PsikologModel.findOne({
        _id: id,
      });
      res.status(200).send(psikologList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updatePsikolog(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const name = body.name;
      const profile = body.profile;
      const keahlian = body.keahlian;
      const keahlian_lain = body.keahlian_lain;
      const pendekatan_terapi = body.pendekatan_terapi;

      const psikologList = await PsikologModel.updateOne(
        { _id: id },
        { 
            name: name, 
            profile: profile,
            keahlian: keahlian,
            keahlian_lain: keahlian_lain,
            pendekatan_terapi: pendekatan_terapi 
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deletePsikolog(req, res) {
    try {
      const id = req.params.id;
      await PsikologModel.deleteOne({ _id: id });
      res
        .status(200)
        .send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}

module.exports = PsikologController;
