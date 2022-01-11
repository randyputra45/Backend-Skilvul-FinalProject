const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webinarSchema = new Schema(
  {
    title: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    url_webinar: {
      type: String,
    },
    psikolog: [{
      type: Schema.Types.ObjectId,
      ref: "Psikolog",
    }],
    total_likes: {
      type: Number,
      default: 0,
    },
    day: {
      type: String
    },
    date: {
      type: String
    },
    price: {
      type: Number
    }
  },
  { timestamps:true }
);

// create new model (nameCollection, nameSchema)
const WebinarSchema = mongoose.model(
  "Webinar",
  webinarSchema
);

module.exports = WebinarSchema;