var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var usersch = new mongoose.Schema({
        local : {
                username : {type : String , required : true },
                password  : {type : String , required : true} ,

        }  ,

        facebook : {
                id : String ,
                tokken : String,
                name : String,
                email : String,
        } ,

        order : [
                        { type : mongoose.Schema.Types.ObjectId ,
                           ref  : "account" ,

                         }


                ]

})

usersch.methods.generateHash = (password) => {
    return  bcrypt.hashSync(password, bcrypt.genSaltSync(5) , null);
}

usersch.methods.matchpass = (password) => {
  return bcrypt.compareSync(password, this.local.password );
}

module.exports = mongoose.model("user" , usersch);
