const express = require("express");
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
    deleteRide
} = require("../controllers/ride")

// PARAMs
router.param("userId", getUserById);
router.param("rideId", getRideById);


// POST
router.post("/createRide/:userId", isSignedIn, isAuthenticated, createRide);
router.post("/ride/locationFilter", getRidesByLocations)

// PUT
router.put("/ride/:rideId", updateRide);

// DELETE
router.delete("/user/:userId/deleteRide/:rideId",isSignedIn, isAuthenticated, deleteRide)


module.exports = router;
 