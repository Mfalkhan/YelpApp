var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const seedDB = require("./seeds");
const Comment = require("./models/comments");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user");
const commentRoutes = require("./routes/comments");
const campgroundsRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");
const methodOveride = require("method-override");


// avoiding the mongo DB error
mongoose.connect("mongodb://localhost/yelp_app", {
 useNewUrlParser: true
}).then(() => {
 console.log('Connected to MongoDB');
}).catch(err => {
 console.log(err.message);
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
  secret:"something",
  resave:false,
  saveUninitialized:false
}));


app.use(methodOveride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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


// seedDB();

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("Server Has Started!");
})
