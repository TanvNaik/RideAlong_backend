const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    members: Array
},{timestamps:true})

module.exports = mongoose.model("Conversation", conversationSchema)