const mongoose = require("mongoose");


const CampgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref :"Comment"
        }
    ],

    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    }

  });

  const campground = mongoose.model("Campground",CampgroundSchema);

  module.exports = campground;