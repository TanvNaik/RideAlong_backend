const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const invoiceSchema = mongoose.Schema({
    invoiceAmount: Number,
    sender:{
        type: mongoose.Schema.ObjectId, 
      ref: 'User', 

    },
    receiver:{
        type: mongoose.Schema.ObjectId, 
      ref: 'User', 

    },
    ride:{
        type: mongoose.Schema.ObjectId, 
      ref: 'Ride', 

    },

},{timestamps:true})



module.exports = mongoose.model("Invoice", invoiceSchema)