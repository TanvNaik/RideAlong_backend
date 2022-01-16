const { validationResult } = require("express-validator");
const Ride = require("../models/ride")
const User = require("../models/user")


exports.getRideById = (req,res, next, id)=>{
    Ride.findById(id).exec((error,ride)=>{
        if(error || !ride){
            return res.status(400).json({
                error: "Unable to find ride"
            })
        }
        req.ride = ride;
        next();
    })
}
exports.getAllRides= (req,res) =>{
    
    Ride.find({}, { sourceLocation, destinationLocation, seats, fare, startTime}).then(rides => {
        return res.json({
            rides: rides
        })
    })
    .catch( err => {
        return res.status(404).json({
            error: "Unable to load rides"
        })
    })
}
exports.requestRide = (req,res)=>{
    Ride.findByIdAndUpdate(req.ride._id,
        {
            $push:{
                "requests": req.profile._id
            }
        })
}
exports.getRidesByLocations = (req,res)=>{
    Ride.find(
        {
            "$match": {
                "$and": {
                    "sourceLocation": req.body.sourceLocation,
                    "destinationLocation": req.body.destinationLocation
                }
            }
        }).exec((error, rides)=>{
            if(error){
                return res.status(400).json({
                    error: "Cannot find rides"
                })
            }
            return res.json(rides)
        })
}
exports.createRide = (req,res)=>{

    const errors = validationResult(req);

    // checking for validation errors
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })//422- Unprocessable entity
    }


    if(req.profile.verificationStatus !== true){
        return res.status(400).json({
            error: "Documents needs to be verified by admin before posting a ride"
        })
    }
    const ride = new Ride(req.body);
    ride.driverUser = req.profile._id
    

    ride.save((err, ride) =>{
        if(err){
            return res.status(400).json({
                error: `${err}`
            })
        }
        req.ride = ride;

        User.findByIdAndUpdate(req.profile._id,{
            $push: {
                "rides": ride._id
            }
        },
        {new: true, useFindAndModify: false },
        (error, user)=>{
            if(error){
                return res.status(400).json({
                    err: "Unable to add ride in user profile"
                })
            }
            return res.json({
                message: "Ride added successfully"
            })  
        })
    })
}

exports.updateRide = (req,res)=>{

    
    Ride.findByIdAndUpdate(
        req.ride._id,
        {
            seats: req.body.seats,
            $push: { "passengers": req.body.passengers}
        },
        {new: true},
        (err,ride)=>{
            if(err){
                return res.status(400).json({
                    error: "Cannot update the ride"
                })
            }

            return res.json(ride)
        })
}
exports.deleteRide = (req,res)=>{
    
    const ride = req.ride;
    ride.remove((error, deletedRide)=>{
        if(error){
            return res.status(400).json({
                error: "Unable to delete the ride"
            })
        }
        return res.json({
            message: "Successfully deleted the ride",
            deletedRide: deletedRide
        })
    })
}
