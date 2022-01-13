const mongoose = require("mongoose");

const psikologSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        profile: {
            type: String,
        },
        keahlian: {
            type: [String],
        },
        keahlian_lain: {
            type: [String],
        },
        pendekatan_terapi: {
            type: [String], 
        },
        image: {
            type: String
        },
        role: {
            type: String
        },
        cloudinaryId: String,
    },
    { timestamps:true }
);

// create new model (nameCollection, nameSchema)
const PsikologSchema = mongoose.model("Psikolog", psikologSchema);

module.exports = PsikologSchema;