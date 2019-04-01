var mongoose  = require("mongoose");

var pubgdataSch = new mongoose.Schema( {

      cart  : {type : Object , required  : true}

} )


module.exports = mongoose.model("zonedata5" , pubgdataSch); 
