var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_app", {
 useNewUrlParser: true
}).then(() => {
 console.log('Connected to MongoDB');
}).catch(err => {
 console.log(err.message);
});

app.use(bodyParser.urlencoded({extended:true}));

// Campgroung Schema or Blueprint
const CampgroundSchema = new mongoose.Schema({
  name:String,
  image:String
});

// Creating a Model
const Campground = mongoose.model("Campground",CampgroundSchema);

// Campground.create(
//   {
//     name:"Textile Hill",
//     image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
//   },(err,campground) => {
//         if(err){
//           console.log(err);
//         }else{
//           console.log(campground);
//         }
//   });


app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("landing");
})

app.get("/campgrounds",function(req,res){

  Campground.find({},(err,campgrounds) => {
        if(err){
          console.log(err);
        }else{
          res.render("campgrounds",{campgrounds})
        }
  })  
})

app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name,image:image};
   
   Campground.create(newCampground,(err,campground) => {
      if(err){
        console.log(err);
      }else{
        res.redirect("/campgrounds");
      }
   })
})

app.get("/campgrounds/new",function(req,res){
   res.render("new");
})



var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("Server Has Started!");
})
