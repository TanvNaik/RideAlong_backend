//Number of seats
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const vehicleSchema = mongoose.Schema({
    name: String,
    model: String,
    vehicleNumber: String,
    numberOfSeats = Number
},{timestamps:true})



module.exports = mongoose.model("Vehicle", vehicleSchema)