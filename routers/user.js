const express = require("express");
const router = express() ;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy ;
const User = require("../model/user") ;
const facebook = require("passport-facebook").Strategy ;
const config = require("../config");


                                        //******for login session***********

passport.serializeUser((user , done) => {
        done(null , user.id) ;
})


passport.deserializeUser((id  , done) => {
            User.findById(id  , (err , user) => {
                done(err , user) ;
            })
})


                                            //******local authentication************

passport.use('local-signup' , new LocalStrategy({
            usernameField : 'username' ,
            passwordField : 'password' ,
            passReqToCallback : true 
} , (req , username , password , done) => {
    
        req.checkBody('username' , "Invalid Email").notEmpty().isEmail() ;
        req.checkBody('password'  , "Invalid Password").notEmpty().isLength({min:4});
        
        var error = req.validationErrors();
        
        if(error){
                var message  = [] ;
                error.forEach( (value) => {
                        message.push(value.message);   
                } )
            return done(null , false , req.flash("error" , message) ) ;    
        }
    
    
            User.findOne({'local.username' : username})
            .then( (data) => {
                    if(data){
                        return done(null , false , req.flash("error" , "USERNAME ALREADY EXITS") )
                    }
                    
                    var newuser = new User() ;
                    newuser.local.username  = username ;
                    newuser.local.password = password;
                    newuser.save((err) => {
                        if(err)
                        return done(err);
                        return done(null , newuser) ;
                    })
                    
                    
            } ).catch( (err) => console.log(err.message) )
    
} ) )


   
    passport.use('local-signin' , new LocalStrategy( {
            usernameField : 'username' ,
            passwordField : 'password' ,
            passReqToCallback : true ,
    } , (req, username , password , done) => {
        
        req.checkBody('username' , "Invalid Email").notEmpty().isEmail() ;
        req.checkBody('password'  , "Invalid Password").notEmpty();
        
        var error = req.validationErrors();
        
        if(error){
                var message  = [] ;
                error.forEach( (value) => {
                        message.push(value.message);   
                } )
            return done(null , false , req.flash("error" , message) ) ;    
        }
            
            User.findOne({'local.username' : username})
            .then( (datas) => {  
                        if(!datas){
                            return done(null , false , req.flash("error" , "USER NOT EXITS")) ;
                        } 
                        
                    if( password !== datas.local.password ) {
                        
                        return done(null , false , req.flash("error" , "Password Invalid"))
                    }    
                    
                    return done(null , datas)
            } )
            .catch( (err) => console.log(err + "this is err") )
        
        
    } ))


                                        //********facebook authentication***********


    passport.use(new facebook({
        
            clientID : config.clientID ,
            clientSecret : config.clientSecret,
            callbackURL  : config.callbackURL ,
            profile : ['emails' , 'name' , 'gender'] ,
        
    } , function(accessToken, refreshToken, profile, done){
        
                    User.findOne({'facebook.id' : accessToken})
                    .then((user) => {
                            if(user){
                                return done(null , user);
                            }
                        console.log("these are values "+ profile)
                        var newuser = new User() ;
                        newuser.facebook.tokken = accessToken ;
                        newuser.facebook.name = profile.name.givenName + ' '+ profile.name.familyName ;
                        newuser.facebook.id = profile.id ;
                        newuser.facebook.email = profile.emails[0].value ;
                        
                        newuser.save()
                        .then( (err) => {
                                if(err){
                                return err.message ;
                                    
                                }
                            return done(null,newuser) ;
                        } )
                    })
                    .catch( err => console.log(err + " this is the err") )
        
    }  )  )






                                    //******routers for local authentiaction***********

router.get("/signup" , (req,res) => {
        res.render("signup");
})

router.post("/signup" , passport.authenticate('local-signup' , {
            successRedirect : "/" ,
            failureRedirect : "/signup" ,
            failureFlash : true ,
}))


router.get("/login" , (req,res) => {
    res.render("login") ;
})



router.post("/login" , passport.authenticate('local-signin' , {
            successRedirect : "/" ,
            failureRedirect : "/login" ,
            failureFlash : true ,
}))



            //*****router for facebook authentication****

    
router.get('/auth/facebook',
  passport.authenticate('facebook' , {scope : ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signup' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });





router.get('/logout' , (req,res) => {
  req.session.cart = null ;
   req.flash("success" , "SUCCESSFULLY LOGOUT");
  req.logout();
  res.redirect("/");
})






module.exports = router ;
    