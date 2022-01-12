const mongoose = require("mongoose");

const paketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    benefit: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paket", paketSchema);
