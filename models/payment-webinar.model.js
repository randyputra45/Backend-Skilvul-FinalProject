const mongoose = require("mongoose");
const Schema = mongoose.Schema

const paymentWebinarSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    date: {
      type: String
    },
    package_name: {
      type: String
    },
    price: {
      type: Number
    },
    payment_method: {
      type: String
    },
    payment_status: {
      type: String
    },
    payment_details: {
      type: Object
    },
  },
  { timestamps: true }
);

const PaymentWebinarSchema = mongoose.model("PaymentWebinar", paymentWebinarSchema);

module.exports = PaymentWebinarSchema;