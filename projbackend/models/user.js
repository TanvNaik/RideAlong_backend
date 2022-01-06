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
      trim: true
    },
    email:{
        type: String,
      trim: true,
      required: true,
      unique: true
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    vehicle:{
        type: Array,
        default: []
    },
    rides:{
        type: Array,
        default: []
    },
    payments:{
        type: Array,
        default:[]
    },
    feedbacks:{
        type: Array,
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
    documentsVerificationStatus: {
      type: Boolean,
      default: false
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