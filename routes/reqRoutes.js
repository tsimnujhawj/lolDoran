"use strict";

const request = require("request")
const cheerio = require("cheerio")
const db = require("../models/champions")
const rp = require('request-promise');

// write items
// res.render(`/champion`, {itemName: itemName})


module.exports = (app)=>{
    app.post("/", (req, res, next)=>{
        console.log(req.body.champName)
        return next()
    },
    (req, res)=>{
        const champName = req.body.champName
            rp(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
        }).then((data)=>{
            const $ = cheerio.load(data);
            const displayData = $(".popular-section").html();
            const popPercent = $(".bigData .green").each((index, el)=>{$(el).html();})
            const imgLink = $(".bigData .item").each((index, el)=> {$(el).children("img").attr("src")});
            const itemName = $(".bigData .item-name").each((index, el)=>{$(el).html();})
            const champImg = $(".champion-image").children("img");
            console.log("ITEM IMG: ---------- " + imgLink);
            console.log("PERCENT: ---------- " + popPercent)
            console.log("ITEM NAME: ---------- " + itemName)
            res.render("champion", {
                stuff: displayData,
                champName: champName,
                champImg: champImg,
                imgLink: imgLink
            });
        })
    }
);
    

    app.get("/homey", (req, res)=> res.send("Hello Home!"));
};

            // the name of items and spells
            // $(".bigData .item-name").each((index, el)=>{
            //     const itemName = $(el).text();
            // })
            // // the percent of each item/spells
            // $(".bigData .green").each((index, el)=>{
            //     const popPercent = $(el).text();
            // })
            // // the image of each item/spells
            // $(".bigData .item").each((index, el)=>{
            //     const itemImg = $(el).children("img").attr("src");
            // })