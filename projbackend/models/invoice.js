const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const invoiceSchema = mongoose.Schema({
    invoiceAmount: Number,
    sender:{
        type: ObjectId,
        ref: "User"
    },
    receiver:{
        type: ObjectId,
        ref: "User"
    },
    ride:{
        type: ObjectId,
        ref: "Ride"
    },

},{timestamps:true})



module.exports = mongoose.model("Invoice", invoiceSchema)