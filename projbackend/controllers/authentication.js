const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) => {
    
    const errors = validationResult(req);

    // checking for validation errors
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:{
                // Param-> field with error
                // msg -> error msg
                msg: errors.array()[0].msg,
                param: errors.array()[0].param
            }
        })//422- Unprocessable entity
    }

    // create a user
    const user = new User(req,body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err: "Unable to save User to DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req,res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:{
                msg: errors.array()[0].msg,
                param: errors.array()[0].param
            }
        })
    }

    User.findOne({email}, ((err, user)=>{
        
        // checking email
        if(err || !user){
            res.status(400).json({
                error: "User email does not exist"
            })
        }
        // checking password
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and Password does not match"
            })
        }

        // creating token
        const token = jwt.sign({_id: user._id},process.env.SECRET)

        res.cokkie("token", token, {expire: new Date() + 5});

        // sending response to frontend
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}})


    }))

}

exports.signout = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "User signout successfull"
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'] ,
    userProperty: "auth"
})


// Custom Middlewares

exports.isAuthenticated = (req,res,next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    
}


exports.isAdmin = (req,res,next) =>{
    if(req.profile.role ===0){
        return res.status(403).json({
            error: "You are not an ADMIN, Access Denied"
        })
    }
    next();
}