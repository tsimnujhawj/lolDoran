const express = require("express");
const pageRoutes = require("./routes/pageRoutes")
const reqRoutes = require("./routes/reqRoutes")
const hbs = require("express-handlebars")
const request = require("request")
const bodyParser = require("body-parser");

// setup express
const app = express();
// setup public folder for the app
app.use(express.static("public"));
// setup page routes for express
app.use(pageRoutes);
// setup api routes for express
app.use(reqRoutes);

// setup body-parser
app.use(bodyParser.json());

// handlebars setup
app.engine( 'handlebars', hbs( { 
    extname: 'handlebars', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');

// start listening at 3000
const PORT = 3000;
app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))