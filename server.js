var express = require("express");
var app = express() ;
var path = require("path");
var fs  = require("fs");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocal = require("passport-local");
var cookie = require("cookie-parser");
var session = require("express-session");
var user = require("./routers/user");
var validator = require("express-validator");
var flash  = require("connect-flash");
var user = require("./routers/user") ;
var playzone = require("./routers/playzone");
var index = require("./routers/index");
var body = require("body-parser");
const MongoStore = require('connect-mongo')(session);

mongoose.connect("mongodb://projectpubg:project1234@ds257590.mlab.com:57590/pubg") ;


app.use(body.urlencoded({extended : true})) ;

app.use(cookie());
app.use(session({
    secret : "pubgareana" ,
    resave  : false ,
    saveUninitialized: false,
    store  : new MongoStore({
        mongooseConnection: mongoose.connection ,
        ttl : 30 * 24 * 60 * 60 ,
    })
})) ;


app.use(passport.initialize());
app.use(passport.session());
app.use(validator()) ;

 app.use(express.static(path.resolve(__dirname, 'client')));
app.set("view engine" , "ejs");

app.use(flash());

app.use(function (req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success = req.flash("success");
    if(req.session.cart){
        res.locals.user = req.session.cart.name ;
    }else{
        res.locals.user = "" ;
    }
    next();
})


//router config

app.use(index);
app.use(user);
app.use(playzone);


// app.get('/' , (req, res) => {
//     // res.writeHead(200 , {'Content-Type' : 'text/html'})
//     // fs.readFile('./client/index.ejs' , (err , data) => {
//     //     if(err)
//     //     return err ;
//     //     res.render(data);
//     // })
  
//       res.render('index');
// } )


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0"  , () => {
      
      console.log("server started");
      
})

