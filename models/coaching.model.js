const mongoose = require("mongoose");

const coachingSchema = new mongoose.Schema(
  {
    materials: {
      type: String,
    },
    content: [{}],
    image: {
      type: String,
    },
    coach: {
      type: String,
    },
    categories: {
      type: Array,
    },
    cloudinaryId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coaching", coachingSchema);