var express = require("express");
var router = express.Router() ;
var zoneinfor1 = require("../model/playzonedata1") ; 
// const { decorateApp } = require('@awaitjs/express');
// const router = decorateApp(express());


router.get('/' ,   (req, res) => {
       
    let play1 = 0 , play2 = 0 , play3 = 0 , play4 = 0 , play5 = 0 , play6 = 0 ; 
       
        zoneinfor1.find()
        .then( (data) => {  play1 = data.length ; 
                    
             res.render("index" , {play1 : play1 , play2 : play2 , 
        play3 : play3 , play4 : play4 ,play5 : play5 , play6 : play6}) ;       
        } )
        .catch(err => console.log(err.message));
       
})



module.exports  = router ;