const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const rideSchema = mongoose.Schema({
    driverUser: {
        type: ObjectId,
        ref: "User"
    },
    passengers: {
        type: [mongoose.Schema.ObjectId], 
        ref: 'User', 
    },
    sourceLocation:[{
        name: String,
        latitude: String,
        longitude: String
    }],
    destinationLocation:[{
        name: String,
        latitude: String,
        longitude: String
    }],
    requests: {
        type: [mongoose.Schema.ObjectId], 
        ref: 'User', 
        default: []
    },
    vehicle:{
        type: ObjectId,
        ref: "Vehicle",
        required: true
    },
    seats:Number,
    startTime: Date,
    fare: Number,
    payments: {
        type: [mongoose.Schema.ObjectId], 
        ref: 'User', 
        default: []
    }
    
},{timestamps:true})



module.exports = mongoose.model("Ride", rideSchema)