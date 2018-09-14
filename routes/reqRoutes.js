// const express = require("express");
// const router = express.Router();

module.exports = (app)=>{
    app.post("/search", (req, res)=>{
        let summonerName = req.body.summonerName;
        console.log(summonerName);
        // make http request to riot api and scrap probuilds for champ
        
        res.render("index", {playerName: summonerName})
    });
    
    app.get("/homey", (req, res)=> res.send("Hello Home!"));
};