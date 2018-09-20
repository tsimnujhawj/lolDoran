const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the schema and model

const ChampionSchema = new Schema({
    name: String,
    topItems: {
        item: {
            name: String,
            imgLink: String,
            percent: String
        }
    }
})

let Champ = mongoose.model("Champion", ChampionSchema)

module.exports = Champ;