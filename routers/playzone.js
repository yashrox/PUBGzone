var express = require("express");
var router  = express.Router() ;
var authcheck = require("../middleware/login");
var order = require("../model/order");
var stripe = require("stripe")("sk_test_BoJByKfpd0JD9w1VZrM1TG8w");
var zonedata1 = require("../model/playzonedata1");

router.get('/registration' , authcheck.isAuth , (req,res) => {
    
        const  data = { btn  :  "playzone1"} ;
        
            res.render("forms" , {data : data});
    
})


router.post('/playzone1',  authcheck.isAuth , (req,res) => {
           
            
                    var data = req.body.play1 ;
                    req.session.cart = data
                    
                    zonedata1.create({cart  :  data})
                    .then( (data) => {console.log(data)} )
                    .catch(err => console.log(err.message))    
                    
                    req.session.amount = 50 ;
                    res.render("paymentpage" , {data : req.session.amount});
        })




//stripe payment
                
        router.post('/checkout' , (req,res) => {
                                
                  stripe.customers.create( { email : req.body.stripeEmail , source : req.body.stripeToken})
                    .then( (customer) => stripe.charges.create( {
                            amount  : req.session.amount ,             
                            description : 'TESTING PAYMENT' ,
                            currency  :  'usd',
                            customer : customer.id ,
                                    
                    } ) ).then( (charges) => order.create({
                                    id : req.user._id ,
                                    cart : req.session.cart ,
                                    tokken : "sdfhqwet"+(Math.random() + 4),
                                    cardID : charges.id ,
                                    price : req.session.amount,
                            })                           
                     ).then( (data) => {    
                            
                        
                         res.render("thanku" , { data : data }) ;  } )
                    .catch(  (err) => console.log(err.message) )
            
        })                
            

//details information


router.get('/details' , (req,res) => {
    console.log(req.user._id);
    order.findOne({id  : req.user._id})
    .then( (data) => { res.render("details" , {data : data});  } )
    
})






module.exports = router ;