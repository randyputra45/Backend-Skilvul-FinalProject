const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    total_likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: []
    },
    cloudinaryId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);