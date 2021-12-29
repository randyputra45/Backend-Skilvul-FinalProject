const mongoose = require("mongoose");

const psikologSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
        },
        photo: {
            type: String, 
        },
        keahlian: {
            type: [String],
        },
        testimoni: {
            type: [String], 
        }
    },
    { timestamps:true }
);

// create new model (nameCollection, nameSchema)
const PsikologSchema = mongoose.model("Psikolog", psikologSchema);

module.exports = PsikologSchema;