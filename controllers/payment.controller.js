const midtransClient = require('midtrans-client');
const bcrypt = require("bcrypt");

class PaymentController {
    static async postNewPayment(req, res, next) {
        // Create Core API instance
        const body = req.body
        const randomCode = await bcrypt.genSalt(10);
        try {
            const salt = await bcrypt.genSalt(10);
            let core = new midtransClient.CoreApi({
                    isProduction : false,
                    serverKey : process.env.server_key,
                    clientKey : process.env.client_key
                });
            
            let parameter = {
                "payment_type": "gopay",
                "transaction_details": {
                    "gross_amount": 12000,
                    "order_id": `${randomCode}`,
                },
                "gopay": {
                    "enable_callback": false,                // optional
                    "callback_url": "someapps://callback"   // optional
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
                    res.json({
                        chargeResponse
                    })
                });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PaymentController;