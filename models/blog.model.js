const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: [{ }],
    image: {
      type: String,
    },
    author: {
      type: String,
    },
    categories: {
      type: Array,
    },
    total_likes: {
      type: Number,
      default: 0,
    },
    cloudinaryId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);