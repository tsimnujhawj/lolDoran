// const express = require("express");
// const router = express.Router();

module.exports = (app)=>{
// const playerName = "TigerBang"; // for testing purposes

// TODO: setup home page hbs view
app.get("/", (req, res)=> res.render("index", {playerName: "Summoner"}));

app.get("/home", (req, res)=> res.render("home"));
};