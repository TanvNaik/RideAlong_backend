const express = require("express");
const { check } = require('express-validator');
const router = express.Router();

const {
    isSignedIn,
    isAuthenticated
} = require("../controllers/authentication")

const {
    getUserById    
} = require("../controllers/user")

const {
    getRideById,
    getRide,
    createRide,
    getRidesByLocations,
    deleteRide,
    getAllRides,
    requestRide,
    rejectRideRequest, 
    approveRideRequest,
    removePassengerFromRide
} = require("../controllers/ride");

// PARAMs
router.param("userId", getUserById);
router.param("rideId", getRideById);

// GET
router.get("/getAllRides", getAllRides)
router.get("/ride/:rideId",  getRide);

// POST
router.post("/createRide/:userId", [
    check("sourceLocation")
    .isLength({min:1})
    .withMessage("Please mention Source Location"),

    check("destinationLocation")
    .isLength({min:1})
    .withMessage("Please mention Destination Location"),


    check("vehicle")
    .isLength({min:1})
    .withMessage("Vehicle is required"),

    check("seats")
    .isLength({min:1})
    .withMessage("Please mention number of vacant seats"),

    check("fare")
    .isLength({min:1})
    .withMessage("Please mention fare, Minimun fare should be 0"),

    check("startTime")
    .isLength({min:1})
    .withMessage("Please mention time of the ride"),

], isSignedIn, isAuthenticated, createRide);
router.post("/ride/locationFilter", getRidesByLocations)


// PUT
router.put("/request-ride/:rideId/:userId", isSignedIn,isAuthenticated, requestRide)
router.put("/approve-passenger/:userId/:rideId/:acceptId", isSignedIn, isAuthenticated, approveRideRequest)
router.put("/reject-passenger/:userId/:rideId/:rejectId", isSignedIn, isAuthenticated, rejectRideRequest)
router.put("/removePassenger/:rideId/:passengerId", removePassengerFromRide)



// DELETE
router.delete("/user/:userId/deleteRide/:rideId",isSignedIn, isAuthenticated, deleteRide)


module.exports = router;
 