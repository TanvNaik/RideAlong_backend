const Ride = require("../models/ride")



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
    const ride = new Ride(req.body);

    ride.save((error, ride) =>{
        if(error){
            return res.status(400).json({
                error: "Cannot save the Ride"
            })
        }
        res.json({
            ride: ride
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
