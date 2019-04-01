var mongoose  = require("mongoose");

var ordersch  = new mongoose.Schema({
        id : String ,
       cart : {type : Object , required : true} ,
       cardID : {type : String , required : true} ,
        date  : {type : Date  , default : Date.now },
        price : Number ,
        tokken : String ,
    
})

module.exports = mongoose.model("account" , ordersch) ;