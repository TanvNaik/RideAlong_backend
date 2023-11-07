const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vehicleSchema = mongoose.Schema({
    owner: {
        type: ObjectId,
        ref: "User"
    },
    namePlate: String,
    model: String,
    numberOfSeats : Number, 
    license: String,
    vehicleInsurance: String,
    vehcileRC: String
},{timestamps:true})



module.exports = mongoose.model("Vehicle", vehicleSchema)