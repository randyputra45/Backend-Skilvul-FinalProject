const midtransClient = require('midtrans-client');
const bcrypt = require("bcrypt");
const PaymentCoachingModel = require("../models/payment-coaching.model");

class PaymentCoachingController {
    static async getAllCoaching(req, res) {
        try {
          const coachingPaymentList = await PaymentCoachingModel.find().populate({
            path: "user",
          });
          res.status(200).send(coachingPaymentList);
        } catch (error) {
          res.status(500).send({ err: error });
        }
    }
    
    static async getCoachingByID(req, res) {
    try {
        const id = req.params.id;

        const coachingPayment = await PaymentCoachingModel.findOne({
        _id: id,
        }).populate({
        path: "user",
        });
        res.status(200).send(coachingPayment);
    } catch (error) {
        res.status(500).send({ err: error });
    }
    }

    static async postCoachingPayment(req, res, next) {
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
                const consul = new PaymentCoachingModel({
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

module.exports = PaymentCoachingController;