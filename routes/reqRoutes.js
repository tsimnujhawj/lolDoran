"use strict";

const request = require("request")
const cheerio = require("cheerio")
const db = require("../models/champions")

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
            request(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
                const $ = cheerio.load(html);
                const popSection = $(".popular-section").html();
                
                // TODO: Finish this insert into MongoDB
                // let data = {
                //     name: req.body.champName,
                //     topItems: {
                //         item: {
                //             name: "this.itemName",
                //             imgLink: "this.itemImg",
                //             percent: 99
                //         }
                //     }
                // }

            // the name of items and spells
            $(".bigData .item-name").each((index, el)=>{
                const itemName = $(el).text();
                // db.create({
                //     topItems: {
                //         item: {
                //             name: itemName
                //         }
                //     }
                // }).then((info)=>{
                //     console.log(info)
                // })
                // $(itemName).appendTo('.popItems')
                // $.html()
            })
            // // the percent of each item/spells
            $(".bigData .green").each((index, el)=>{
                const popPercent = $(el).text();
                // db.create({
                //     topItems: {
                //         item: {
                //             percent: popPercent
                //         }
                //     }
                // }).then((info)=>{
                //     console.log(info)
                // })
            })
            // // the image of each item/spells
            $(".bigData .item").each((index, el)=>{
                const itemImg = $(el).children("img").attr("src");
                // db.create({
                //     topItems: {
                //         item: {
                //             imgLink: itemImg
                //         }
                //     }
                // }).then((info)=>{
                //     console.log(info)
                // })
            })
                
            })
            const response = res.json()
            
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