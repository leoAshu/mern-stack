var imagePath = "./images/";

var heading = document.querySelector("h1");
var images = document.querySelectorAll("img");

var dice1 = Math.floor(Math.random() * 6) + 1;
var dice2 = Math.floor(Math.random() * 6) + 1;

if(dice1 > dice2) {
    heading.textContent = "Player1 Wins!";
} else if(dice1 < dice2) {
    heading.textContent = "Player2 Wins!";
} else {
    heading.textContent = "Draw!";
}

images[0].setAttribute("src", imagePath + "dice" + dice1 + ".png");
images[1].setAttribute("src", imagePath + "dice" + dice2 + ".png");
