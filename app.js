//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")


const app = express();

var items = [];
var workItems =[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({etended: true}));
app.use(express.static("public"))

app.get("/",function(req,res){
  let day = date.getDate();
  res.render('list', {listTitle: day , newItems : items })
});

app.post("/", function(req,res){

  var input = req.body.input;

  if( req.body.list === "Work"){
    workItems.push(input)
    res.redirect("/work")
  } else{
    items.push(input)
    res.redirect("/");
  }


})

app.get("/work",function(req,res){
  res.render("list", {listTitle: "Work list", newItems : workItems })
})

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000, function (){
  console.log("server started on port 3000")
})


// app.post("/work", function(req,res){
//   var item = req.body.input;
//   workItems.push(item);
//   console.log(workItems)
//   res.redirect("/work")
// })
