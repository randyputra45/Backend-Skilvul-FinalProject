const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
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
    other_blog: {
      type: [Schema.Types.ObjectId],
      ref: "Other Blog"
    },
    cloudinaryId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);