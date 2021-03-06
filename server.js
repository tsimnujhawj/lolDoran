const express = require("express");
const hbs = require("express-handlebars")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


// setup express
const app = express();
// setup public folder for the app
app.use(express.static("public"));

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// mongodb/mongoose setup
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/loldoranforum";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
let mongodbCon = mongoose.connection;
mongodbCon.on("connected", ()=> console.log("MongoDB connected"));

// handlebars setup
app.engine( 'handlebars', hbs( { 
    extname: 'handlebars', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

// routes
require("./routes/pageRoutes")(app);
require("./routes/reqRoutes")(app);

// start listening at 3000
const PORT = 3000;
app.listen(process.env.PORT || PORT, ()=> console.log(`App is running on port ${PORT}`))

module.exports = app;