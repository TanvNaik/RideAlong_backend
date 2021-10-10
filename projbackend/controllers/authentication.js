const { body, validationResult } = require('express-validator');
const User = require('../models/userser');

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


    }))

}