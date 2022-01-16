const User = require("../models/user")
const Ride = require("../models/ride")
const Feedback = require("../models/feedback")
const Invoice = require("../models/invoice")
const Vehicle = require("../models/vehicle")
const { check, validationResult } = require('express-validator');




exports.getUserById = (req,res, next, id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    })
}
exports.getUser = (req,res)=>{

    //hiding secured info
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    
    return res.json(req.profile);  
}
exports.addVehicle = (req,res)=>{

    const errors = validationResult(req);

    // checking for validation errors
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })//422- Unprocessable entity
    }

    const vehicle = new Vehicle(req.body);
    vehicle.owner = req.profile._id;
    vehicle.license = req.files.license[0].filename;
    vehicle.vehicleInsurance = req.files.vehicleInsurance[0].filename;
    vehicle.vehicleRC = req.files.vehicleRC[0].filename;


    vehicle.save((error, vehicle)=>{
        if(error){
            return res.status(400).json({
                err: "Unable to add vehicle"
            })
        }
        req.vehicle = vehicle;

        User.findByIdAndUpdate(req.profile._id,{
            $push: {
                "vehicle": vehicle._id
            }
        },
        {new: true, useFindAndModify: false },
        (error, user)=>{
            if(error){
                return res.status(400).json({
                    err: "Unable to add vehicle in user profile"
                })
            }
            return res.json({
                message: "Vehicle added successfully"
            })  
        })
    })
}

exports.getUserVehicles = (req, res) => {

    Vehicle.find({owner: req.profile._id})
    .exec((err, vehicles) => {
        if(err || !vehicles){
            return res.status(400).json({
                error: "No vehicles found"
            })
        }
        return res.json({
            vehicles: vehicles
        })
    })

}

exports.verifyUser = (req,res) =>{
    const userId = req.body.userId;
    
    User.findByIdAndUpdate(userId, {verificationStatus: true}, {new: true}, (err, user) =>{
        if(err){
            return res.status(400).json({
                error: "Unable to verify the user"
            })
        }
        else{
            return res.status(200).json({
                message: "User Verified Succesfully"
            })
        }
    })
}
exports.getUserRides = (req,res)=>{
    Ride.find({$or : 
        [
            {"driverUser": req.profile._id},
            {"passengers": {
                $in : 
                [ req.profile._id ]
                }
            }
        ]
    }).exec((err, rides)=>{
        if(err || !rides){
            return res.json({
                error: "No Rides Found"
            })
        }
        return res.json({
            rides: rides
        });
    })
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(req.profile._id,
        {$set: req.body},
        {new: true, useFindAndModify: false },
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "Unable to update the user"
                })
            }
            user.salt = undefined,
            user.encry_password = undefined

            return res.json(user)
        })
}

exports.getUserPayments = (req,res)=>{

    Invoice.find({
        "_id": {
            $in: req.profile.payments
        }
    }, (error,payments)=>{
        if(error){
            return res.status(400).json({
                error: "Cannot find Payments"
            })
        }
        return res.json({
            payments: payments
        })
    })
}
exports.showPendingVerifications = (req,res) =>{

/*     User.find({documentsVerificationStatus: false},
    (error, users) => {
        if(error){
            return res.status(400).json({
                error: "Unable to load users"
            })
        }
        return res.json(users)
    }) */
    User.find({documentsVerificationStatus: false}).exec((err, users) => {
        if (err) {
          return res.status(400).json({
            error: "NO Users found"
          });
        }
        res.json({
            users: users
        });
      });


   /*  User.find({documentsVerificationStatus: false},{ _id, name, document, documentsVerificationStatus})
    .exec((error, user) => {
        if(error){
            return res.status(400).json({
                error: "Unable to load users"
            })
        }
        return res.json(user)
    }) */
}
// FEEDBACKS
exports.getUserFeedBacks = (req,res)=>{
    
    Feedback.find({
        "_id": {
            $in: req.profile.feedbacks
        }
    }, (error,feedbacks)=>{
        if(error){
            return res.status(400).json({
                error: "Cannot find Feedbacks"
            })
        }
        return res.json({
            feedbacks: feedbacks
        })
    })
}
exports.setFeedbacker = (req,res,next,id)=>{
    console.log(req.params)
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;

        //hiding secured info
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
    })
    next();
}
exports.setFeedbackReceiver = (req,res, next, id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.feedbackReceiver = user;

        //hiding secured info
        req.feedbackReceiver.salt = undefined;
        req.feedbackReceiver.encry_password = undefined;

        next();
    })
}
exports.writeFeedback = (req,res)=>{
    const feedback = new Feedback({
        feedbacker: req.profile._id,
        receiver: req.feedbackReceiver._id,
        feedbackText: req.body.feedbackText,
        rating: req.body.rating
    })

    feedback.save((err,feedback)=>{
        if(err){
            return res.status(400).json({
                error: `${err}`,
            })
        }
        User.findByIdAndUpdate(feedback.receiver, 
            {"$push" : { "feedbacks": feedback._id}},
            {new: true, useFindAndModify: false },
            (err, user)=>{
                if(err){
                    return res.status(400).json({
                        error: "Unable to update feedback to receiver"
                    })
                }
                }
            )
        return res.json({
            feedbacker: feedback.feedbacker,
            receiver: feedback.receiver,
            feedbackText: feedback.feedbackText,
            rating: feedback.rating
        })
    })
}