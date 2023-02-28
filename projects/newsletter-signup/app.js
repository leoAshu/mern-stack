const express = require("express");
const parser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    console.log(fName + " " + lName);
    console.log(email);
});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});