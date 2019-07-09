var express = require("express");
var app = express();
var request = require("request");

app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("home");
})





var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("Server Has Started!");
})
