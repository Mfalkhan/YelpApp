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
  
router.post("/",isLoggedIn,function(req,res){
     const name = req.body.name;
     const image = req.body.image;
     const description = req.body.description;
     const author = {
        username : req.user.username,
        id : req.user._id
     };
     const newCampground = {name:name,image:image,description:description,author : author};
     
     Campground.create(newCampground,(err,campground) => {
        if(err){
          console.log(err);
        }else{
          res.redirect("/campgrounds");
        }
     })
  })
  
  // NEW ROUTE displays form to enter new campground
  
  router.get("/new",isLoggedIn,function(req,res){
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
  
// EDIT ROUTE

router.get("/:id/edit",editCampgroundOwnership,(req,res) =>{
    Campground.findById(req.params.id,(err,foundCampground) =>{
            res.render("campgrounds/edit",{campground : foundCampground});      
})
});


// UPDATE ROUTE

router.put("/:id",(req,res) =>{
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// DESTROY ROUTE

router.delete("/:id",(req,res) =>{
    Campground.findByIdAndDelete(req.params.id,(err,campground) =>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})

  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }

  function editCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
      Campground.findById(req.params.id,(err,foundCampground) =>{
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            if (foundCampground.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");
            }
        }
    })
    }else{
      res.redirect("back");
    }
  }

  module.exports = router;