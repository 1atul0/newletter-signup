const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use("/public",express.static("public"));//for accessing css and img for html file which was sent by app.get
app.use(bodyParser.urlencoded({extended:true}));//for using body-parser
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){//post send by signup.html file
  console.log("yes");
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var email=req.body.email;
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  res.send("you have done");
});



app.listen(3000,function(){//for cheking your server is running or not
  console.log("server is running on port 3000");
});