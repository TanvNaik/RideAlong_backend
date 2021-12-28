const express = require('express')
const router = express.Router();

const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/authentication")

const {
    getUserById, getUserFeedBacks,getUserRides, getUser, 
    updateUser,writeFeedback, setFeedbackReceiver, 
    setFeedbacker,getUserPayments, addVehicle
} = require("../controllers/user")

// PARAMs
router.param("userId", getUserById)
router.param("feedbacker", setFeedbacker)
router.param("feedbackReceiver", setFeedbackReceiver)

// GET
router.get("/user/:userId", isSignedIn, getUser);
router.get("/feedbacks/user/:userId", getUserFeedBacks);
router.get("/rides/user/:userId",getUserRides);
router.get("/payments/user/:userId", getUserPayments)

// PUT
router.put("/user/:userId", isSignedIn, isAuthenticated,updateUser);

// POST
router.post("/writeFeedback/feedbacker/:feedbacker/feedbackReciever/:feedbackReceiver", isSignedIn, isAuthenticated, writeFeedback)
router.post("/addVehicle/user/:userId", addVehicle) //TODO: check this route

module.exports = router;