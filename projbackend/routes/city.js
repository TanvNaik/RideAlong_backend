const express = require("express");
const router = express.Router();

const {
    addcity,
    deleteCity,
    getAllCities,
    getCityById,
    getCityNames
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

// GET
router.get("/getAllCities", getAllCities)
router.get("/city-names/:sourceId/:destinationId", getCityNames)

// POST
router.post("/city/:userId", isSignedIn, isAuthenticated, isAdmin, addcity)

// DELETE
router.delete("/city/:cityId", deleteCity)

module.exports = router;
