//jshint version:6

const express = require("express");
const https = require("https");
const parser = require("body-parser");

const app = express();
app.use(parser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.city;
    const units = "metric";
    const apiKey = "09dd9ff381005e3b324f253dd790f888";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celsius.</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });

    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});