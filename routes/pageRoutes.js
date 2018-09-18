const request = require("request")
const cheerio = require("cheerio")

module.exports = (app)=>{
// const playerName = "TigerBang"; // for testing purposes

// TODO: setup home page hbs view
app.get("/", (req, res)=> res.render("index", {champName: "SELECT A CHAMP"}));

app.get(`/champion`, (req, res)=>{
    console.log(req.body)
    const info = request(`https://www.probuilds.net/champions/details/${req.body.champName}`, (err, res, html)=>{
        if (err) throw err
        const $ = cheerio.load(html);
        const popSection = $(".popular-section");
        return popSection
    })
}
);

};