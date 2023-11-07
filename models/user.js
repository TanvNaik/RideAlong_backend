const mongoose = require('mongoose');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    username:{
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique: true
    },
    email:{
        type: String,
      trim: true,
      required: true,
      unique: true
    },
    gender:{
      type: String
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    vehicle:{
      type: [mongoose.Schema.ObjectId], 
      ref: 'Vehicle', 
        default: []
    },
    rides:{
      type: [mongoose.Schema.ObjectId], 
      ref: 'Ride', 
        default: []
    },
    payments:{
      type: [mongoose.Schema.ObjectId], 
      ref: 'Invoice', 
        default:[]
    },
    feedbacks:{
      type: [mongoose.Schema.ObjectId], 
      ref: 'Feedback', 
      default:[]
    },
    contact_number:{
        type: Number,
        required: true,
    },
    profile_pic:{
        type: String
    },
    role:{
      type: Number,
      default: 0
    },
    document: {
      type: String
    },
    verificationStatus: {
      type: Boolean,
      default: false,
      required: true
    }
},{timestamps: true});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password
      ? true
      : false;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("User", userSchema);