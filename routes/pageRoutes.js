const express = require("express");
const router = express.Router();

// const playerName = "TigerBang"; // for testing purposes

// TODO: setup home page hbs view
router.get("/", (req, res)=> res.render("index", {playerName: "Test"}));

router.get("/home", (req, res)=> res.render("home"));

module.exports = router;