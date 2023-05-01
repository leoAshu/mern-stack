require('dotenv').config();
const express = require("express");
const parser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    console.log(firstName + " " + lastName);
    console.log(email);

    const data = {
        members: [
           {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
           } 
        ],
        update_existing: true
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/" + process.env.LIST_ID;

    const options = {
        method: "POST",
        auth: "apiKey:" + process.env.API_KEY,
    };

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));

            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});