var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const seedDB = require("./seeds");
const Comment = require("./models/comments");

// avoiding the mongo DB error
mongoose.connect("mongodb://localhost/yelp_app", {
 useNewUrlParser: true
}).then(() => {
 console.log('Connected to MongoDB');
}).catch(err => {
 console.log(err.message);
});

app.use(bodyParser.urlencoded({extended:true}));



// Campground.create(
//   {
//     name:"Textile Hill",
//     image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     description:"A simple yet beautiful hill"
//   },(err,campground) => {
//         if(err){
//           console.log(err);
//         }else{
//           console.log(campground);
//         }
//   });


app.set("view engine","ejs");

// Root Route
app.get("/",function(req,res){
  res.render("landing");
})

seedDB();

// INDEX ROUTE displays all the campgrounds

app.get("/campgrounds",function(req,res){

  Campground.find({},(err,campgrounds) => {
        if(err){
          console.log(err);
        }else{
          res.render("campgrounds/index",{campgrounds})
        }
  })  
})

// CREATE ROUTE adds a new campground to the database

app.post("/campgrounds",function(req,res){
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

app.get("/campgrounds/new",function(req,res){
   res.render("campgrounds/new");
})

// SHOW ROUTE 

app.get("/campgrounds/:id",function(req,res){
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


// COMMENT ROUTES

app.get("/campgrounds/:id/comments/new",(req,res) =>{

      //  Find the campground 
      Campground.findById(req.params.id,(err,campground) =>{
          if(err){
            console.log(err);
          }else{
            res.render("comments/new",{campground})
          }
      });
});

app.post("/campgrounds/:id/comments",(req,res) =>{

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

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("Server Has Started!");
})
