"use strict";
const cheerio = require("cheerio")
const rp = require("request-promise");
const Post = require("../models/forumPost")
const moment = require("moment")

const champArr = ["Ahri", "Akali", "Alistar", "Amumu", "Anivia",
"Annie", "Ashe", "Blitzcrank", "Brand", "Caitlyn", "Cassiopeia",
"Cho'gath", "Corki", "Darius", "Dr. Mundo", "Ekko", "Evelynn", "Ezreal",
"Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen",
"Gragas", "Graves", "Hecarim", "Heimerdinger", "Irelia", "Janna",
"Jarvan IV", "Jax", "Karma", "Karthus", "Kassadin", "Katarina",
"Kayle", "Kennen", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona",
"Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi",
"Miss Fortune", "Mordekaiser", "Morgana", "Nasus", "Nautilus",
"Nidalee", "Nocturne", "Nunu", "Olaf", "Orianna", "Pantheon",
"Poppy", "Rammus", "Renekton", "Riven", "Rumble", "Ryze",
"Sejuani", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir",
"Skarner", "Sona", "Soraka", "Swain", "Talon", "Taric", "Teemo",
"Tristana", "Trundle", "Trydamere", "Twisted Fate", "Twitch",
"Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Viktor", "Vladimir",
"Volibear", "Warwick", "Wukong", "Xerath", "Xin Zhao", "Yasuo",
"Yorick", "Zed", "Ziggs", "Zilean"]


module.exports = (app)=>{
    app.post("/", (req, res, next)=>{
        return next()
    },
    (req, res)=>{
        // change champion name into uppercase for uniformity
        const champName = req.body.champName.toUpperCase()

            // request promise to probuilds.net, scraping
            rp(`https://www.probuilds.net/champions/details/${champName}`, (err, res, html)=>{
                if (err) throw err
            }).then((data)=>{
            const $ = cheerio.load(data);
            // build object for scraper to use
            let champ = {
                name: champName,
                items: [],
                post: []
            }
            let itemArr = champ.items
            let postArr = champ.post
            
                // grab mongodb forum to display onto page
                Post.find({
                    champion: champName
                }, (err, docs)=>{
                    docs.forEach((info)=>{
                        let newDate = moment(info.time).format("MMMM Do YYYY, h:mm a")
                        let obj = {
                            name: info.name,
                            post: info.post,
                            champion: champName,
                            time: newDate
                        }
                        postArr.push(obj)
                    })
                })

                // grab info from probuilds.net
                $(".bigData").each((index, el)=> {
                    let itemUrl = $(el).children(".item").children("img").attr("src");
                    let itemName = $(el).children(".item-name").text();
                    let popularity = $(el).children(".popularity").text();
                    // insert info into an object for the champ.items arr
                    let obj = {
                        name: itemName,
                        url: itemUrl,
                        pop: popularity
                    }
                    // insert object into champ.items array for each item iteration
                    itemArr[index] = obj
                });

                    
                    // render the scraped info to hbs
                    const champImg = $(".champion-image").children("img");
                    res.render("champion", {
                        itemName: champ.items,
                        champName: champName,
                        champImg: champImg,
                        forum: champ.post,
                        champArr: champArr
                    });
        })
    }
);

    // send data to database and redirect
    app.post("/post", (req, res, next)=>{
        if (req.body.name && req.body.post) {
            let post = new Post({
                name: req.body.name,
                post: req.body.post,
                champion: req.body.champion
            })
                post.save((err)=>{
                    if (err) throw err
                })
                    res.redirect("/posted");
        }
    })

}; // CLOSING BRACE