const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const invoiceSchema = mongoose.Schema({
    invoiceAmount: Number,
    invoiceDate: Date,
    sender:{
        type: ObjectId,
        ref: "User"
    },
    receiver:{
        type: ObjectId,
        ref: "User"
    },
    rider:{
        type: ObjectId,
        ref: "Ride"
    },

},{timestamps:true})



module.exports = mongoose.model("Invoice", invoiceSchema)