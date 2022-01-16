const express = require("express");
const { check, validationResult } = require('express-validator');
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
    createRide,
    updateRide,
    getRidesByLocations,
    deleteRide,
    getAllRides,
    requestRide
} = require("../controllers/ride")

// PARAMs
router.param("userId", getUserById);
router.param("rideId", getRideById);

// GET
router.get("/getAllRides", isSignedIn, isAuthenticated, getAllRides)

// POST
router.post("/createRide/:userId", [
    check("sourceLocation")
    .isLength({min:1})
    .withMessage("Source Location is required"),

    check("destinationLocation")
    .isLength({min:1})
    .withMessage("Destination Location is required"),

    check("vehicle")
    .isLength({min:1})
    .withMessage("Vehicle is required"),

    check("seats")
    .isLength({min:1})
    .withMessage("Please mention number of vacant seats"),

    check("fare")
    .isLength({min:0})
    .withMessage("Please mention fare, Minimun fare should be 0"),

    check("startTime")
    .isLength({min:0})
    .withMessage("Please mention time of the ride"),

], isSignedIn, isAuthenticated, createRide);
router.post("/ride/locationFilter", getRidesByLocations)


// PUT
router.put("/ride/:rideId", updateRide);
router.put("/request-ride/:rideId/:userId", isSignedIn,isAuthenticated, requestRide)
router.put("/approve-passenger/:userId")


// DELETE
router.delete("/user/:userId/deleteRide/:rideId",isSignedIn, isAuthenticated, deleteRide)


module.exports = router;
 