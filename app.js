//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});

app.get("/failure", (req, res) => {
  res.sendFile(__dirname + "/failure.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/b9dc1c3975";
  const options = {
    method: "POST",
    auth: "nekoes:2e8e9b3f9fd3609daf0aaee92266765-us10"
  };

  const request = https.request(url, options, response => {
    if (response.statusCode == 200) {
      res.redirect("/success");
    } else {
      res.redirect("/failure");
    }

    // response.on("data", data => {
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
});

// API Key
// 2e8e97b3f9fd3609daf0aaee92266765-us10

// Audience ID
// b9dc1c3975

app.listen(process.env.PORT || 3000, () => {
  console.log("Newsletter app is running at port 3000");
});
