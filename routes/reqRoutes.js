// const express = require("express");
// const router = express.Router();

module.exports = (app)=>{
    app.post("/search", (req, res)=>{
        console.log(req.body)
        res.render("index", (req)=>{
            console.log(req)
            // return playerName = document.getElementById("summonerEntry").value;
        },
        {playerName: "Tigerbang"})
    });
    
    app.get("/homey", (req, res)=> res.send("Hello Home!"));
};