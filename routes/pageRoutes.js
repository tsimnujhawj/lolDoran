const request = require("request")
const cheerio = require("cheerio")

module.exports = (app)=>{
// const playerName = "TigerBang"; // for testing purposes

app.get("/", (req, res)=> res.render("index", {champName: "SELECT A CHAMP"}));

};