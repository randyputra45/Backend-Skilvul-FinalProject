const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      default: [],
      type: Array
    },
  },
  { timestamps: true }
);

const TestSchema = mongoose.model("Test", testSchema);

module.exports = TestSchema;
