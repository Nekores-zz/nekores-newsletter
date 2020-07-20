//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const reload = require("reload");
// const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
});



reload(app).then(function (reloadReturned){
  app.listen(3000, () => {
    console.log("Newsletter app is running at port 3000");
  });

});


