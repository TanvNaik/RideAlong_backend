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

    User.findById(req.params.findUser).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.user = user;
          //hiding secured info
    req.user.salt = undefined;
    req.user.encry_password = undefined;
    req.user.createdAt = undefined;
    req.user.updatedAt = undefined;
    
    return res.json({
        user: req.user
    });  
    })

  
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
        if(err || vehicles.length == 0){
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
            },
            {"requests": {
                $in : 
                [ req.profile._id ]
                }
            }
        ]
    })
    .populate('driverUser requests sourceLocation destinationLocation').exec((err, rides)=>{
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
    }).populate("receiver").exec((error,payments)=>{
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

}
// FEEDBACKS
exports.getUserFeedBacks = (req,res)=>{
    
    Feedback.find({
        "_id": {
            $in: req.profile.feedbacks
        }
    }).populate("feedbacker").exec((error,feedbacks)=>{
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

exports.writeFeedback = (req,res)=>{
    
    const feedback = new Feedback({
        feedbacker: req.params.feedbacker,
        receiver: req.params.feedbackReceiver,
        feedbackText: req.body.feedbackText,
        rating: req.body.rating
    })

    feedback.save((err,feedback)=>{
        if(err){
            return res.status(400).json({
                error: `Unable to save`,
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

exports.updatePaymentInUser = (req,res) => {
    User.findByIdAndUpdate(req.body.sender, 
        {"$push" : { "payments": res.locals.invoice._id}},
        {new: true, useFindAndModify: false },
        (err, user)=>{
            if(err){
                return res.status(400).json({
                    error: "Unable to update payment to sender"
                })
            }
            res.locals.invoiceSender = user;
            User.findByIdAndUpdate(req.body.receiver, 
                {"$push" : { "payments": res.locals.invoice._id}},
                {new: true, useFindAndModify: false },
                (err, ruser)=>{
                    if(err){
                        return res.status(400).json({
                            error: "Unable to update payment to receiver"
                        })
                    }
                    res.locals.invoiceReceiver = ruser;
                    console.log("Done with sender")
                    return res.json({
                        invoice: res.locals.invoice,
                        ride: res.locals.ride
                    })

                }
                )
        }
        )
}
