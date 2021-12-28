const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vehicleSchema = mongoose.Schema({
    owner: {
        type: ObjectId,
        ref: "User"
    },
    name: String,
    model: String,
    vehicleNumber: String,
    numberOfSeats : Number,
    driverLicenceNumber: String
},{timestamps:true})



module.exports = mongoose.model("Vehicle", vehicleSchema)