var express = require("express");
var router  = express.Router() ;
var authcheck = require("../middleware/login");
var order = require("../model/order");
var stripe = require("stripe")("sk_test_BoJByKfpd0JD9w1VZrM1TG8w");
var zonedata1 = require("../model/playzonedata1");
var zonedata2 = require("../model/playzonedata2");
var zonedata3 = require("../model/playzonedata3");
var zonedata4 = require("../model/playzonedata4");
var zonedata5 = require("../model/playzonedata5");
var zonedata6 = require("../model/playzonedata6");

router.get('/registration/:id' , authcheck.isAuth , (req,res) => {

        let  data  ;
        console.log(req.params.id)
        switch (+req.params.id) {
          case 1: data = "playzone1"
            break;
          case 2: data = "playzone2"
            break ;
          case 3 : data = "playzone3"
              break ;
          case 4 : data = "playzone4"
                break ;
          case 5 : data = "playzone5"
                  break ;
          case 6 : data = "playzone6"
                    break ;
          default: console.log("not a choice")

        }

            res.render("forms" , {data : data});

})


router.post('/playzone1',  authcheck.isAuth , async(req,res) => {


                    var data = req.body.play1 ;
                    req.session.cart = data

                    let check  =   await zonedata1.collection.countDocuments({});

                      if(check <= 9){
                    zonedata1.create({cart  :  data})
                    .then( (data) => {console.log(data)} )
                    .catch(err => console.log(err.message))
                    req.session.amount = 50 ;
                    res.render("paymentpage" , {data : req.session.amount});
                  }else{
                      req.flash("error" , "LIMIT IS FULL");
                      res.redirect("/");
                  }


        })



        router.post('/playzone2',  authcheck.isAuth , async(req,res) => {


                            var data = req.body.play1 ;
                            req.session.cart = data

                          let check  = await zoneinfor2.collection.countDocuments({}) ;

                            if(check <= 9){
                              zonedata2.create({cart  :  data})
                              .then( (data) => {console.log(data)} )
                              .catch(err => console.log(err.message))

                              req.session.amount = 100 ;
                              res.render("paymentpage" , {data : req.session.amount});
                            }else{
                                req.flash("error" , "LIMIT IS FULL");
                                res.redirect("/");}
                })


    router.post('/playzone3',  authcheck.isAuth , async(req,res) => {

var data = req.body.play1 ;
req.session.cart = data ;

    let check = await zoneinfor3.collection.countDocuments({}) ;

      if(check <= 9 ){

zonedata3.create({cart  :  data})
.then( (data) => {console.log(data)} )
.catch(err => console.log(err.message))
req.session.amount = 150 ;
res.render("paymentpage" , {data : req.session.amount});
      }else{    req.flash("error" , "LIMIT IS FULL");
          res.redirect("/");
        }
      }
                        )


    router.post('/playzone4',  authcheck.isAuth , async(req,res) => {

        let check =  await zoneinfor4.collection.countDocuments({}) ;

        if(check <= 9){

        var data = req.body.play1 ;
          req.session.cart = data ;
          zonedata4.create({cart  :  data})
          .then( (data) => {console.log(data)} )
          .catch(err => console.log(err.message))
            req.session.amount = 200 ;
          res.render("paymentpage" , {data : req.session.amount});

        }else{
          req.flash("error" , "LIMIT IS FULL");
             res.redirect("/");
        }
                                })

    router.post('/playzone5',  authcheck.isAuth , async(req,res) => {

      let check = await zonedata5.collection.countDocuments({});

      if(check <= 9){

      var data = req.body.play1 ;
      req.session.cart = data
      zonedata5.create({cart  :  data})
      .then( (data) => {console.log(data)} )
      .catch(err => console.log(err.message))
      req.session.amount = 250 ;
      res.render("paymentpage" , {data : req.session.amount});

      }else{
        req.flash("error" , "LIMIT IS FULL");
           res.redirect("/");
      }            })


      router.post('/playzone6',  authcheck.isAuth , async(req,res) => {

          let check = await zonedata6.collection.countDocuments({})

          if(check <= 9){
            var data = req.body.play1 ;
              req.session.cart = data
              zonedata6.create({cart  :  data})
              .then( (data) => {console.log(data)} )
              .catch(err => console.log(err.message))
                req.session.amount = 300 ;
                res.render("paymentpage" , {data : req.session.amount});

          }else{
            req.flash("error" , "LIMIT IS FULL");
               res.redirect("/");
          }

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
