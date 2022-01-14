const ConsultationModel = require("../models/payment-consultation.model");
const midtransClient = require('midtrans-client');
const bcrypt = require("bcrypt");
const axios = require("axios");

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
  
  static async getPaymentStatus(req, res, next) {
    const config2 = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic U0ItTWlkLXNlcnZlci03MHNpUlFuOGt0Zk1qNVBsM3lvQUpMdWQ6"
      },
    };

    try {
      const res = await axios
      .get("https://api.sandbox.midtrans.com/v2/e9c413d7-bd64-457f-8fc6-74ca847655e7/status", { config2 })
      res.status(200).json(data)
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
            "phone": body.phone,
        },
        "item_details": [
          {
            "name": body.package_name,
            "price": body.price,
            "quantity": 1,
            "merchant_name": "GoCure"
          },
        ],
      };
      
      // charge transaction
      core.charge(parameter)
        .then(async (chargeResponse) =>{
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

            const saved = await consul.save();
            if(saved) {
              res.status(200).send(saved);
              console.log(saved)
            }
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
