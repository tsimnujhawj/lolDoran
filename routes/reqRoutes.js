const express = require("express");
const router = express.Router();

router.get("/test", (req, res)=> res.send("Hello World!"));

router.get("/homey", (req, res)=> res.send("Hello Home!"));

module.exports = router;