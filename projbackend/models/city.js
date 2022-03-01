const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("City", citySchema);