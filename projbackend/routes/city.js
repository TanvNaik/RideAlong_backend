const express = require("express");
const router = express.Router();

const {
    addcity,
    deleteCity,
    getCityById
} = require("../controllers/city")
const {
    getUserById
}= require("../controllers/user")
const {
    isSignedIn,
    isAuthenticated,
    isAdmin
}= require("../controllers/authentication")

// PARAMs 
router.param("userId",getUserById)
router.param("cityId",getCityById)

// POST
router.post("/city/:userId", isSignedIn, isAuthenticated, isAdmin, addcity)

// DELETE
router.delete("/city/:cityId", deleteCity)

module.exports = router;
