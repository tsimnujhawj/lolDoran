"use strict";
const cheerio = require("cheerio")
const rp = require("request-promise");
const Post = require("../models/forumPost")
const moment = require("moment")


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
                            console.log(postArr)
                        })
                    })
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