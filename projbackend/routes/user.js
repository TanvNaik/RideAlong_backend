const express = require('express')
const router = express.Router;

const {isSignedIn, isAdmin, isAuthenticated} = require("../controllers/authentication")

const {getUserById, getUserFeedBacks,getUserRides} = require("../controllers/user")

// GET
router.get("/:userId", getUserById)
router.get("/:userId/feedbacks",getUserFeedBacks);
router.get("/:userId/rides",getUserRides);
    

// PUT
router.put("/update/:userID")