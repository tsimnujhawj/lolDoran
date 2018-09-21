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
        const champName = req.body.champName.toUpperCase()
            rp(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
        }).then((data)=>{
            const $ = cheerio.load(data);
            const displayData = $(".popular-section").html();
            const popPercent = $(".bigData .green").each((index, el)=>{$(el).html();})

            let champ = {
                name: champName,
                items: []
            }
            let itemArr = champ.items

            $(".bigData").each((index, el)=> {
                let itemUrl = $(el).children(".item").children("img").attr("src");
                let itemName = $(el).children(".item-name").text();
                let popularity = $(el).children(".popularity").text();
                console.log(itemUrl);
                let obj = {
                    name: itemName,
                    url: itemUrl,
                    pop: popularity
                }
                itemArr[index] = obj
            });
            console.log("---------------------------FINAL: " + JSON.stringify(champ.items))
            const champImg = $(".champion-image").children("img");
            res.render("champion", {
                itemName: champ.items,
                champName: champName,
                champImg: champImg,
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