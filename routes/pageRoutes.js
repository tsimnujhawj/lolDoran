const cheerio = require("cheerio")
const rp = require("request-promise");
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

// build 
app.get("/", (req, res)=> {
    res.render("index", {champArr: champArr})
});

app.get("/posted", (req, res)=> {
    res.render("index", {
        champName: "POSTED SUCCESSFULLY"
    }
    )
        // res.redirect("/")
})

};