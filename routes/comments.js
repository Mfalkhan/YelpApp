const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds")
const Comment = require("../models/comments")

// COMMENT ROUTES

router.get("/new",isLoggedIn,(req,res) =>{

    //  Find the campground 
    Campground.findById(req.params.id,(err,campground) =>{
        if(err){
          console.log(err);
        }else{
          res.render("comments/new",{campground})
        }
    });
});

router.post("/",isLoggedIn,(req,res) =>{

  // Find the campground
  Campground.findById(req.params.id,(err,campground) =>{

      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        Comment.create(req.body.comment,(err,comment) =>{
            if(err){
              console.log(err);
            }else{
              campground.comments.push(comment);
              campground.save();
              res.redirect("/campgrounds/" + campground._id);
            }
        });
      }
  });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }
  

  module.exports = router;