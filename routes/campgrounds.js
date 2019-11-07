const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds")
const Comment = require("../models/comments")

// INDEX ROUTE displays all the campgrounds

router.get("/",function(req,res){

    Campground.find({},(err,campgrounds) => {
          if(err){
            console.log(err);
          }else{
            res.render("campgrounds/index",{campgrounds})
          }
    })  
  })
  
  // CREATE ROUTE adds a new campground to the database
  
router.post("/",function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var description = req.body.description;
     var newCampground = {name:name,image:image,description:description};
     
     Campground.create(newCampground,(err,campground) => {
        if(err){
          console.log(err);
        }else{
          res.redirect("/campgrounds");
        }
     })
  })
  
  // NEW ROUTE displays form to enter new campground
  
  router.get("/new",function(req,res){
     res.render("campgrounds/new");
  })
  
  // SHOW ROUTE 
  
  router.get("/:id",function(req,res){
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
      if(err){
        console.log(err);
      }else{
        // render show template
        res.render("campgrounds/show",{campground:foundCampground});
      }
    })
  })
  

  module.exports = router;