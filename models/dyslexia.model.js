const mongoose = require("mongoose");

const dyslexiaSchema = new mongoose.Schema(
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
  { timeStamps: true }
);

module.exports = mongoose.model("Dyslexia", dyslexiaSchema);
