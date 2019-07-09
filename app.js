var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

var campgrounds = [
  {name:"Salmon Scales", image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
  {name:"Textile Hill", image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
  {name:"Rattler's Sand", image:"https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"},
  {name:"Rattler's Sand", image:"https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"},
]

app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("landing");
})

app.get("/campgrounds",function(req,res){

  res.render("campgrounds",{campgrounds})
})

app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name:name,image:image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
})

app.get("/campgrounds/new",function(req,res){
   res.render("new");
})



var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("Server Has Started!");
})
