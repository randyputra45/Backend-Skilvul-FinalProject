const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    data: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);