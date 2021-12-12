const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    latitude: String,
    longitude: String
},{timestamps: true})

module.exports = mongoose.model("City", citySchema);