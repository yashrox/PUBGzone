var express = require("express");
var router = express.Router() ;
var zoneinfor1 = require("../model/playzonedata1") ;

var zoneinfor2 = require("../model/playzonedata2") ;
var zoneinfor3 = require("../model/playzonedata3") ;
var zoneinfor4 = require("../model/playzonedata4") ;
var zoneinfor5 = require("../model/playzonedata5") ;
var zoneinfor6 = require("../model/playzonedata6") ;

router.get('/' ,   async(req, res) => {

    let play1 = 0 , play2 = 0 , play3 = 0 , play4 = 0 , play5 = 0 , play6 = 0 ;

        play1  = await zoneinfor1.collection.countDocuments({}) ;
        play2  = await zoneinfor2.collection.countDocuments({}) ;
        play3  = await zoneinfor3.collection.countDocuments({}) ;
        play4  = await zoneinfor4.collection.countDocuments({}) ;
        play5  = await zoneinfor5.collection.countDocuments({}) ;
        play6  = await zoneinfor6.collection.countDocuments({}) ;

        res.render("index" , {play1 : play1 , play2 : play2 ,
   play3 : play3 , play4 : play4 ,play5 : play5 , play6 : play6}) ;


})



module.exports  = router ;
