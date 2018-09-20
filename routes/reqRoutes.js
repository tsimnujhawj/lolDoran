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
        let result = {};
            rp(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
                const $ = cheerio.load(html);
                const popSection = $(".popular-section").html();
            // the name of items and spells
            $(".bigData .item-name").each((index, el)=>{
                const itemName = $(el).text();
            })
            // // the percent of each item/spells
            $(".bigData .green").each((index, el)=>{
                const popPercent = $(el).text();
            })
            // // the image of each item/spells
            $(".bigData .item").each((index, el)=>{
                const itemImg = $(el).children("img").attr("src");
            })
        }).then((data)=>{
            console.log(data);
            const $ = cheerio.load(data);
            const textData = $(".popular-section").html();
            res.render("index", {stuff: textData});
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