

module.exports = {
    
    isAuth : function(req,res,next){
                            
                if(req.isAuthenticated()){
                     next() ;
                }else{
                    req.flash("error" , "YOU NEED TO LOGIN FIRST");
                    res.redirect("/login");
                }
                
    }
    
}