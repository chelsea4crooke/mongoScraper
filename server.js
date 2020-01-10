var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express_Handlebars = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();
var router = express.Router();
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", express_Handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function(err){
    if(err) {
    console.log("Error!");
    } 
    else {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, function(){
    console.log("LIstening on port: " + PORT);
});
