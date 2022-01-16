const express = require('express')
const router = express.Router();
const multer = require("multer");
const path = require("path")
const {check, validationResult} = require("express-validator")

const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/authentication")

const {
    getUserById, getUserFeedBacks,getUserRides, getUser, 
    updateUser,writeFeedback, setFeedbackReceiver, 
    setFeedbacker,getUserPayments, addVehicle,
    verifyUser, showPendingVerifications,getUserVehicles
} = require("../controllers/user")


const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,path.join(__dirname, "../uploads/images"))  
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const upload = multer({storage: fileStorageEngine})

// PARAMs
router.param("userId", getUserById)
router.param("feedbacker", setFeedbacker)
router.param("feedbackReceiver", setFeedbackReceiver)

// GET
router.get("/user/:userId", isSignedIn, getUser);
router.get("/feedbacks/user/:userId", getUserFeedBacks);
router.get("/rides/user/:userId",getUserRides);
router.get("/payments/user/:userId", getUserPayments)
router.get("/vehicles/user/:userId", isSignedIn, isAuthenticated, getUserVehicles)

// PUT
router.put("/user/:userId", isSignedIn, isAuthenticated,updateUser);

// POST
router.post("/writeFeedback/feedbacker/:feedbacker/feedbackReciever/:feedbackReceiver", isSignedIn, isAuthenticated, writeFeedback)
router.post("/addVehicle/user/:userId",upload.fields([{
    name: "license", maxCount:1
},{
    name: "vehicleInsurance", maxCount: 1
},{
    name: "vehicleRC", maxCount: 1
}]), [
    check("model")
    .isLength({min: 1})
    .withMessage("Please provide model name"),

    check("nameplate")
    .isAlphanumeric()
    .withMessage("Enter valid nameplate number"),

    check("numberOfSeats")
    .isLength({min: 1})
    .withMessage("Number of seats can't be empty")

],addVehicle) 


//Admin
router.get("/pendingUserVerifications/:userId", isSignedIn, isAuthenticated, isAdmin, showPendingVerifications)
router.put("/verify-user/:userId", isSignedIn, isAuthenticated, isAdmin, verifyUser);


module.exports = router;