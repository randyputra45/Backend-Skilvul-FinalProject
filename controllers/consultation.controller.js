const ConsultationModel = require("../models/consultation.model");

class ConsultationController {
  static async createNewConsultation(req, res) {
    try {
      const NewConsultation = new ConsultationModel(req, body);
      const saved = await NewConsultation.save();
      res.status(201).json({
        message: "New Consultation Paket added",
        consultation: saved,
      });
      res.status(201).send(saved);
    } catch (error) {
      res.status(500).send({ err: error });
      
    }
  }

  static async getAllConsultation(req, res) {
    try {
      const consultationList = await ConsultationModel.find();
      res.status(200).send(consultationList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getConsultationByID(req, res) {
    try {
      const id = req.params.id;

      const consultationList = await ConsultationModel.findOne({
        _id: id,
      });
      res.status(200).send(consultationList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateConsultation(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = body.user;
      const psikolog = body.psikolog;
      const consultation_schedule = body.consultation_schedule;
      const consultation_paket = body.consultation_paket;

      const consultationList = await ConsultationModel.updateOne(
        { _id: id },
        {
          user: user,
          psikolog: psikolog,
          consultation_schedule: consultation_schedule,
          consultation_paket: consultation_paket,
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteConsultation(req, res) {
    try {
      const id = req.params.id;
      await ConsultationModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}
module.exports = ConsultationController;
