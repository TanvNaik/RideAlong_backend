const { validationResult } = require("express-validator");
const Ride = require("../models/ride")
const User = require("../models/user")

exports.getRideById = (req,res, next, id)=>{
    Ride.findById(id)
    .populate('sourceLocation driverUser destinationLocation requests passengers payments')
    .exec((error,ride)=>{
        if(error || !ride){
            return res.status(400).json({
                error: "Unable to find ride"
            })
        }
        req.ride = ride;
        next();
    })
}
exports.getRide = (req,res) => {
    return res.json({
        ride: req.ride
    })
}
exports.getAllRides= (req,res) =>{
    
    let limit = req.query.limit ? parseInt(req.query.limit) : 9

    let sortBy = req.query.sortBy ? req.query.sortBy : "createdAt"

    Ride.find()
    .sort([[sortBy, 'descending']])
    .populate('driverUser')
    .limit(limit)
    .exec((err, rides) => {
        if(err){
            return res.status(400).json({
                error: "No rides found"
            })
        }
        return res.json({
            rides: rides
        })
    })
}
exports.requestRide = (req,res)=>{
    Ride.findByIdAndUpdate(req.ride._id,
        {
            $push:{
                "requests": req.profile._id
            }
        },
        {new: true, useFindAndModify: false },
        (err, ride) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to request ride"
                })
            }
            return res.json({ride: ride})
        }
        ) 
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
                message: "Ride posted successfully"
            })  
        })
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

exports.rejectRideRequest = (req,res) => {
    Ride.findByIdAndUpdate(
        req.ride._id,
        {
            $pull: { "requests": req.params.rejectId}
        },
        {new: true},
        (err,ride)=>{
            if(err){
                return res.status(400).json({
                    error: "Cannot reject the request"
                })
            }
            return res.json(ride)
        })

}


exports.approveRideRequest = (req,res) => {
    Ride.findByIdAndUpdate(
        req.ride._id,
        {
            $inc: {seats: -1},
            $push: { "passengers": req.params.acceptId},
            $pull: { "requests": req.params.acceptId}
        },
        {new: true},
        (err,ride)=>{
            if(err){
                return res.status(400).json({
                    error: "Cannot accept the request"
                })
            }

            return res.json(ride)
        })
}
exports.updatePayemtInRide = (req,res,next)=>{
    Ride.findByIdAndUpdate(req.params.rideId,
        {$push: { 'payments': req.body.sender}},
        {new: true, useFindAndModify: false},
        (err, ride) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to pay for the ride"
                })
            }
            res.locals.ride = ride
            console.log("Done in ride")
            next()
        }
    )
}
exports.removePassengerFromRide = (req,res) => {
    Ride.findByIdAndUpdate(req.params.rideId, { $pull: { passengers: req.params.passengerId }}, {new: true, useFindAndModify: false},(err, ride) => {
        if(err){
            return res.status(400).json({
                error: "Unable to remove passenger"
            })
        }
        User.findByIdAndUpdate(
            req.params.passengerId,
            {
                $pull: { "rides": req.params.rideId}
            },
            {new: true},
            (err,user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Cannot remove passenger"
                    })
                }
                return res.json({
                    message: "Passenger removed successfully"
                })
            })
    
        
    } )
}