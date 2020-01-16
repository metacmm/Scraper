//Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = 3000;

//Initialize Express
var app = express();

// Make public a static folder
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Import routes and give the server access to them.
var routes = require("./controllers/scraper.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});