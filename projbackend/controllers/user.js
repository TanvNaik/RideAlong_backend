const User = require("../models/user")
const Ride = require("../models/ride")
const Feedback = require("../models/feedback")
const user = require("../models/user")
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

exports.getUserRides = (req,res)=>{
    Ride.find({$or: 
        [
            {"driverUser": req.profile._id},
            {"passengers": {
                $in: 
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
        return rides;
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

// FEEDBACKS
exports.getUserFeedBacks = (req,res)=>{
    return res.json({
        feedbacks: req.profile.feedback
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
        req.feedbacker = user;
        //hiding secured info
        req.feedbacker.salt = undefined;
        req.feedbacker.encry_password = undefined;
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
        feedbacker: req.feedbacker,
        receiver: req.feedbackReceiver,
        feedbackText: req.body.feedbackText,
        rating: req.body.rating
    })

    feedback.save((err,feedback)=>{
        if(err){
            return res.status(400).json({
                error: `${err}`,
            })
        }
        return res.json({
            feedbacker: feedback.feedbacker,
            receiver: feedback.receiver,
            feedbackText: feedback.feedbackText,
            rating: feedback.rating
        })
    })
}