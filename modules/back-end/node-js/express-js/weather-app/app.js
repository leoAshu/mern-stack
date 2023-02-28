//jshint version:6

const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=San Jose,us&units=metric&appid=09dd9ff381005e3b324f253dd790f888";

    https.get(url, function (response) {
        console.log("statusCode:", response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in San Jose is " + temperature + " degrees Celsius.</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });

    });

});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});