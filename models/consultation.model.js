const mongoose = require("mongoose");
const Schema = mongoose.Schema

const consultationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    psikolog: {
      type: Schema.Types.ObjectId,
      ref: "Psikolog"
    },
    consultation_schedule: {
      type: String,
    },
    consultation_paket: {
      type: String,
    },
  },
  { timestamps: true }
);

const ConsultationSchema = mongoose.model("Consultation", consultationSchema);

module.exports = ConsultationSchema;