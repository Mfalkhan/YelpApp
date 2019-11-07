const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user")



// Root Route
router.get("/",function(req,res){
    res.render("landing");
  })
  

// AUTH ROUTES

// basic sign up page
router.get("/register",(req,res) =>{
    res.render("User/register");
});

router.post("/register",(req,res) =>{

    User.register(new User({username : req.body.username}), req.body.password,(err,user) =>{
          if(err){
            console.log(err);
            return res.redirect("/register");
          }

          passport.authenticate("local")(req,res,() =>{
              res.redirect("/campgrounds");
          });
    })
})


//  LOGIN ROUTES

router.get("/login",(req,res) =>{
  res.render("User/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}));

// LOGOUT ROUTE
router.get("/logout",(req,res) =>{
  req.logOut();
  res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;