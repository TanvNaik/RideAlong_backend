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
        ref: "City",
        required: true
    },
    destinationLocation:{
        type: ObjectId,
        ref: "City",
        required: true
    },
    requests: {
        type:Array,
        default: []
    },
    vehicle:{
        type: ObjectId,
        ref: "Vehicle",
        required: true
    },
    seats:Number,
    startTime: Date,
    fare: Number
    
},{timestamps:true})



module.exports = mongoose.model("Ride", rideSchema)