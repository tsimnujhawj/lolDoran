const request = require("request")
const cheerio = require("cheerio")

// write items
// res.render(`/champion`, {itemName: itemName})

module.exports = (app)=>{
    app.post("/", (req, res)=>{
        const champName = req.body.champName;
        // make http request to riot api and scrap probuilds for champ
        request(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
            if (err) throw err
            const $ = cheerio.load(html);
            const popSection = $(".popular-section");
            // res.render("/champion", {itemName: popSection});

            // the name of items and spells
            // $(".bigData .item-name").each((index, el)=>{
            //     const itemName = $(el).text();
            //     console.log(itemName)
            // })
            // // the percent of each item/spells
            // $(".bigData .green").each((index, el)=>{
            //     const popPercent = $(el).text();
            //     console.log(popPercent)
            // })
            // // the image of each item/spells
            // $(".bigData .item").each((index, el)=>{
            //     const itemImg = $(el).children("img").attr("src");
            //     console.log(itemImg);
            // })
        })
        
    });
    
    app.get("/homey", (req, res)=> res.send("Hello Home!"));
};