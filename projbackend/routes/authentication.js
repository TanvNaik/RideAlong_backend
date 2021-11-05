const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const {signup, signin,signout} = require("../controllers/authentication")


// use express validator to check
router.post("/signup", [
    check("name")
    .isLength({min: 3})
    .withMessage("Name should be atleast 3 characters"),

    check("username")
    .isAlphanumeric()
    .withMessage("Enter valid username")
    .isLength({min:6})
    .withMessage("username must be atleast 6 characters"),

    check("email")
    .isEmail()
    .withMessage("Email is required"),

    check("password")
    .isLength({min: 6})
    .withMessage("Password should be atleast 6 characters")

], signup )

module.exports = router;