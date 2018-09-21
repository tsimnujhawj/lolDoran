const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create the schema and model

const PostSchema = new Schema({
    name: String,
    time: {type: Date, default: Date.now},
    post: String,
    champion: String
})

let Post = mongoose.model("Post", PostSchema)

module.exports = Post;