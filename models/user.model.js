const mongoose = require("mongoose");
const crypto = require("crypto");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

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
      minlength: [6, 'Minimum password length is 6 characters'],
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
    sex: {
      type: String
    },
    birth_date: {
      type: String
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
    }],
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    role: {
      type: String,
      default: "member"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps:true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // 10 minutes
  return resetToken;
}

// Create new model(nameCollection, nameSchema)
module.exports = mongoose.model("User", userSchema);