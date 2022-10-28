const express = require("express");
const router = express.Router();
const weatherAPI = require("../api/weatherAPI");
const cities = require("all-the-cities");

router.get("/weather", async (req, res) => {
    const temp = await weatherAPI.getTemperature(req.query.city, req.query.days);
    console.log(temp);
    res.send(temp);
});

router.get("/cities", async (req, res) => {
    var test = cities.filter((city) => city.name);
    var city = [];
    for (let index = 0; index < test.length; index++) {
        city.push(test[index].name);
    }
    res.send(city);
});

module.exports = router;
