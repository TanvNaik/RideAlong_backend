const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    latitude: Number,
    longitutde: Number
})

module.exports = mongoose.model("City", citySchema);