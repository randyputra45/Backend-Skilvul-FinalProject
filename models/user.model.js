const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters']
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    no_telp: {
      type: String,
      required: true,
    },
    liked_blog: [{
      type: Schema.Types.ObjectId,
      ref: "Blog",
      default: []
    }],
    liked_webinar: [{
      type: Schema.Types.ObjectId,
      ref: "Webinar",
      default: []
    }]
  },
  { timestamps:true }
);

// Create new model(nameCollection, nameSchema)
module.exports = mongoose.model("User", userSchema);