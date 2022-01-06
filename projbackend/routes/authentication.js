const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require("multer");
const {signup, signin,signout, isSignedIn} = require("../controllers/authentication")


const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"./images")  
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({storage: fileStorageEngine})


// GET routes
router.get("/signout", signout);


router.get("/test",  (req,res)=>{
    res.json("hello from backend");
})
// POST routes
router.post("/signin", 
    [
        check("username")
        .isLength({min:3})
        .withMessage("Enter valid username"),
        
        check("password")
        .isLength({min:1})
        .withMessage("Password field is required")
    ],
    signin
)

router.post("/signup",   upload.array("images",2), [
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
    .withMessage("Enter valid email-id"),

    check("password")
    .isLength({min: 6})
    .withMessage("Password must be minimum 6 characters including special symbol"),

    check("contact_number")
    .isLength({min: 10, max: 10})
    .withMessage('Mobile number should be 10 digits only')

] , signup )

module.exports = router;