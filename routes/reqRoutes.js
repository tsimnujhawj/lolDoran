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
            console.log(itemArr)
            const imgLink = $(".tooltip").each((index, el)=> {
                let itemUrl = $(el).children("img").attr("src")
                let obj = {
                    url: itemUrl
                }
                itemArr[index] = obj
            });
            const itemName = $(".bigData .item-name").each((index, el)=>{
                let itemN = $(el).html();
                let obj = {
                    name: itemN,
                    // url: itemUrl
                }
                itemArr[index] = obj
            })
            console.log("---------------------------FINAL: " + JSON.stringify(champ))
            const champImg = $(".champion-image").children("img");
            res.render("champion", {
                itemName: champ.items.name,
                champName: champName,
                champImg: champImg,
                imgLink: champ.items.url
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