const ConsultationModel = require("../models/consultation.model");
const midtransClient = require('midtrans-client');
const bcrypt = require("bcrypt");

class ConsultationController {
  static async createNewConsultation(req, res) {
    try {
      const NewConsultation = new ConsultationModel(req.body);
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
      const consultationList = await ConsultationModel.find().populate({
        path: "user",
      });
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
      }).populate({
        path: "user",
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

  static async postNewPayment(req, res, next) {
    // Create Core API instance
    const body = req.body
    const randomCode = await bcrypt.genSalt(5);

    try {
      let core = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : process.env.server_key,
        clientKey : process.env.client_key
      });
      
      let parameter = {
        "payment_type": "gopay",
        "transaction_details": {
            "gross_amount": body.price,
            "order_id": `${randomCode}`,
        },
        "gopay": {
            "enable_callback": false, // optional
            "callback_url": "someapps://callback" // optional
        },
        "customer_details": {
            "first_name": body.first_name,
            "last_name": body.last_name,
            "email": body.email,
            "phone": body.phone
        }
      };
      
      // charge transaction
      core.charge(parameter)
        .then((chargeResponse)=>{
          console.log('chargeResponse:');
          console.log(chargeResponse);

          try {
            const consul = new ConsultationModel({
              user: body.user,
              date: body.date,
              package_name: body.package_name,
              price: body.price,
              payment_method: body.payment_method,
              payment_details: chargeResponse
            });

            const saved = consul.save();
            res.status(200).send(saved);
          } catch (error) {
            res.status(500).send({ err: error });
          }
        });
    } catch (error) {
        next(error)
    }
  }
}
module.exports = ConsultationController;
