//jshint version:6

// 09dd9ff381005e3b324f253dd790f888
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}

const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=09dd9ff381005e3b324f253dd790f888";

    https.get(url, function (response) {
        console.log("statusCode:", response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log("responseData:", weatherData);
        });
    });

    res.send("Server is up and running.");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});