//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const _ = require("lodash");
const mongoose = require("mongoose");




const homeStartingContent = "Can you write articles that are capable of grabbing reader's attention....if so, what are you waiting for....unleash the blogger inside you and publish your article across the web...now!!!";
const aboutContent = "This is a basic version of a blog website...where people post blogs..";
const contactContent = "For any suggestions or collabs. drop a mail at: mswamiganesh@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-ganesh:#@cluster0.ah7zk.mongodb.net/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

const postSchema = {
  title:String,
  content:String
};

const Post = mongoose.model("Post",postSchema);


app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});
})






app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  
  const post = new Post({
    title:req.body.postTitle,
    content:req.body.postArea
    
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  
  

  
});


app.get("/",function(req,res){ 

  Post.find({}, function(err, posts){

    res.render("home", {
  
      matter: homeStartingContent,
  
      posts: posts
  
      });
  
  })
  
  
});



app.get("/posts/:postId",function(req,res){


const reqPostId = req.params.postId;


Post.findOne({_id: reqPostId}, function(err, post){

  if(!err){
    res.render("post", {

      title: post.title,
  
      content: post.content
  
    });
  }else{
    console.log(err);
    res.redirect("/");
  }

  

});

})

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port,function() {
  console.log("Server started on port 3000");

});
