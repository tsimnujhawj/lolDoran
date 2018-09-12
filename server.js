const express = require("express");
const pageRoutes = require("./routes/pageRoutes")
const reqRoutes = require("./routes/reqRoutes")


// setup express
const app = express();
// setup public folder for the app
app.use(express.static("public"));
// setup page routes for express
app.use(pageRoutes);
// setup api routes for express
app.use(reqRoutes);

// start listening at 3000
const PORT = 3000;
app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))