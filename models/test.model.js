const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: [String],
      cemas: "tidak pernah",
      stress: "sering",
      depresi: "selalu",
    },
  },
  { timestamps: true }
);

const TestSchema = mongoose.model("Test", testSchema);

module.exports = TestSchema;
