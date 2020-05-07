const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use new google strategy
passport.use(new googleStrategy({
    clientID:"480427380401-ce5dfekb87rbq6h5g3ibuqj5r2se3pej.apps.googleusercontent.com",
    clientSecret:"xXtmh27X6vx6c2-OxC7p8bpM",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //find the user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error ingoogle strategy-passport",err);
                return;
            }
            console.log(profile);

            //if user found set this user as req.user
            if(user){
                return done(null,user);
            }else{
            //if user not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){
                        console.log('Error in creating user',err);
                        return;
                    }else{
                        return done(null,user);
                    }
                })
            }
        })
    }
));

module.exports=passport;