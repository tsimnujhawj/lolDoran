const express = require("express");
const router = express.Router();

router.post("/search", (req, res)=>{
    console.log(req)
    res.render("index", (req)=>{
        console.log(req)
        // return playerName = document.getElementById("summonerEntry").value;
    },
    {playerName: "Tigerbang"})
});

router.get("/homey", (req, res)=> res.send("Hello Home!"));

module.exports = router;