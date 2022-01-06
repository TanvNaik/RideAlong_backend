const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = (req,res) => {
    //req.files contains the array of file

    const errors = validationResult(req);

    // checking for validation errors
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })//422- Unprocessable entity
    }
 

    const user = new User(req.body);
    user.document = req.files[1].filename;
    user.profile_pic = req.files[0].filename;

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: err /*"Unable to add user in Database"*/
            })
        }
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id,
            profile_pic: user.profile_pic,
            document: user.document
        })
    })



/*     let form = new formidable.IncomingForm();
    form.keepExtension = true;
 */
/*     form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Not a valid file"
            })
        }

        const {name, username, password, email, contact_number, document} =fields;

        if(
            !name ||
            !username || 
            !password ||
            !email || 
            !contact_number 
        ){
            return res.status(400).json({
                error: "Please fill required fields"
            })
        }

        let user = new User(fields);



        //handling files 
        //size check
        if(file.document){
            // approx 3mb
            if(file.document.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            user.document.data = fs.readFileSync(file.document.filepath);
            user.document.contentType = file.document.type;
        }

        //saving user in DB
        user.save((err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to add user in Database"
                })
            }
            return res.json({
                name: user.name,
                email: user.email,
                id: user._id,
                document: user.document,

            })
        })



    }) */












/* 
    // create a user
    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                error: "User already exist"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    }) */
}

exports.signin = (req,res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        })
    }
    User.findOne(
        {$or:[
            {email: username},
            {username: username}
        ]}
            , ((err, user)=>{

        // checking if user with given email exists
        if(err || !user){
            return res.status(400).json({
                error: "Wrong credentials"
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
        res.cookie("token", token, {expire: new Date() + 5});
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
    if (!checker) {
        return res.status(403).json({
          error: "ACCESS DENIED"
        });
      }
    next();
}


exports.isAdmin = (req,res,next) =>{
    if(req.profile.role ===0){
        return res.status(403).json({
            error: "You are not an ADMIN, Access Denied"
        })
    }
    next();
}