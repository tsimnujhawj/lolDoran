const request = require("request")
const cheerio = require("cheerio")

// write items
// res.render(`/champion`, {itemName: itemName})

module.exports = (app)=>{
    app.post("/search", (req, res, next)=>{
        console.log(req.body.champName)
        return next()
    },
    (req, res)=>{
        const champName = req.body.champName
        let result = {};
            request(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
                const $ = cheerio.load(html);
                const popSection = $(".popular-section");
                result.popSection = popSection
                db.doransbook.create(result).then((data)=>{
                    console.log(data);
                })
            })
            console.log(result.popSection);
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