const express = require("express");
const router = express.Router();
const weatherAPI = require("../api/weatherAPI");

router.get("/weather", async (req, res) => {
    const temp = await weatherAPI.getTemperature(req.query.city, req.query.days);
    console.log(temp);
    res.send(temp);
});

module.exports = router;
