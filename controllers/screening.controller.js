const ScreeningModel = require("../models/screening.model");

class ScreeningController {
  static async createNewScreening(req, res) {
    try {
      const NewScreening = new ScreeningModel(req.body);
      const saved = await NewScreening.save();
      res.status(201).json({
        message: "New Screening added",
        test: saved,
      });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllScreening(req, res) {
    try {
      const screeningList = await ScreeningModel.find();
      res.status(200).send(screeningList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getScreeningByID(req, res) {
    try {
      const id = req.params.id;

      const screeningList = await ScreeningModel.findOne({
        _id: id,
      });
      res.status(200).send(screeningList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateScreening(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const question = body.question;
      const answer = body.answer;

      const screeningList = await ScreeningModel.updateOne(
        { _id: id },
        {
          question: question,
          answer: {
            cemas: "tidak pernah",
            stress: "sering",
            depresi: "selalu",
          },
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteScreening(req, res) {
    try {
      const id = req.params.id;
      await ScreeningModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}
module.exports = ScreeningController;
