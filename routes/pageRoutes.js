const request = require("request")
const cheerio = require("cheerio")

module.exports = (app)=>{
// const playerName = "TigerBang"; // for testing purposes

// TODO: setup home page hbs view
app.get("/", (req, res)=> res.render("index", {champName: "SELECT A CHAMP"}));

app.get(`/champion`, (req, res)=>{
    console.log(req)
    }
);

};