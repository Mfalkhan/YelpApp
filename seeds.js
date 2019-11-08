const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");


const data = [
        {
            name :"simple tree in the woods",
            image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XWXdq9R-W9Zik2vRW154vQHaE8%26pid%3DApi&f=1",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minima iure nobis eligendi laborum obcaecati? Nostrum, cum.A simple yet beautiful camp"
        },
        {
            name :"clouds rest",
            image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.goodsam.com%2Ftrailerlifedirectory%2Flargefeatured%2F1000x%2Fpho_200000698_04.jpg&f=1&nofb=1",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minima iure nobis eligendi laborum obcaecati? Nostrum, cum."
        },
        {
            name :"simple tree in the woods",
            image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.yb76EXfcGxbb3jlNzH2vBgHaEK%26pid%3DApi&f=1",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minima iure nobis eligendi laborum obcaecati? Nostrum, cum."
        },
        {
            name :" lone tree in the woods",
            image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ss1kiynZ0EzlxOyBtISy5gHaE0%26pid%3DApi&f=1",
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minimaLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minimaLorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minima iure nobis eligendi laborum obcaecati? Nostrum, cum. iure nobis eligendi laborum obcaecati? Nostrum, cum. iure nobis eligendi laborum obcaecati? Nostrum, cum.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis recusandae dolorum quo minima iure nobis eligendi laborum obcaecati? Nostrum, cum."
        }

];

function seedDB(){

        // remove all the campgrounds
        Campground.remove({},err =>{
            if(err){
                console.log(err);
            }
            console.log("campground removed");

            // data.forEach(seed=>{
            //     Campground.create(seed,(err,campground)=>{
            //             if(err){
            //                 console.log(err);
            //             }else{
            //                 console.log("added a campground");
            //             }
            //             // create a comment

            //             Comment.create({

            //                     text :"not a good thing",
            //                     author:"farhan khan"

            //             },(err,comment)=>{
            //                 campground.comments.push(comment);
            //                 campground.save();
            //                 console.log("created new comment");
            //             });
            //     });
            // });
        });
    }

    module.exports = seedDB;
