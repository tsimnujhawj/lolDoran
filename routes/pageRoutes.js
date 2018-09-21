const cheerio = require("cheerio")
const rp = require('request-promise');

module.exports = (app)=>{

// build 
app.get("/", (req, res)=> res.render("index", {champName: "SELECT A CHAMP"}));

};