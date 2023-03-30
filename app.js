const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing"); //used for second method
const { Server } = require("http");
//used for second method
// mailchimp.setConfig({
//   apiKey:'6760d8a780cb2ea4f49e44c01936816d',
//   server:'us21'
// });
app.use("/public", express.static("public")); //for accessing css and img for html file which was sent by app.get
app.use(bodyParser.urlencoded({ extended: true })); //for using body-parser
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  //post send by signup.html file
  console.log("yes");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    //for first method
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/1c7fb496fe";
  const options = {
    method: "POST",
    auth: "atul1:6760d8a780cb2ea4f49e44c01936816d-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  //for second method
  //   try{const response =mailchimp.lists.addListMember('1c7fb496fe', {
  //     email_address:email,
  //     merge_fields:
  //     {
  //       FNAME:firstName,
  //       LNAME:lastName,
  //     },
  //     status: 'subscribed',
  //   });
  // // console.log(response);
  // res.send("success");
  // }
  // catch(err)
  // {
  //   console.log("something bad");
  //   res.send("try again with correct email");
  //   // console.log(err);
  // }
});
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000, function () {
  //for cheking your server is running or not
  console.log("server is running on port 3000");
});

// Api key
// 6760d8a780cb2ea4f49e44c01936816d-us21

//audience id
//1c7fb496fe
