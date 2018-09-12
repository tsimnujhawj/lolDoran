const express = require("express");
const router = express.Router();

// TODO: setup home page hbs view
router.get("/", (req, res)=> res.send("Hello World!"));

router.get("/home", (req, res)=> res.send("Hello Home!"));

module.exports = router;