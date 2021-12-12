const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const rideSchema = mongoose.Schema({
    driverUser: {
        type: ObjectId,
        ref: "User"
    },
    passengers: Array,
    sourceLocation:{
        type: ObjectId,
        ref: "City"
    },
    destinationLocation:{
        type: ObjectId,
        ref: "City"
    },
    vehicle:{
        type: ObjectId,
        ref: "Vehicle"
    },
    seats:Number,
    startTime: Date,
    fare: Number
    
},{timestamps:true})



module.exports = mongoose.model("Ride", rideSchema)