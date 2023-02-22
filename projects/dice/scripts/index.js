var randomDiceValue1 = Math.floor(Math.random() * 6) + 1;
var randomDiceValue2 = Math.floor(Math.random() * 6) + 1;

var diceImages = document.querySelectorAll("img");

diceImages[0].setAttribute("src", "./images/dice" + randomDiceValue1 + ".png");
diceImages[1].setAttribute("src", "./images/dice" + randomDiceValue2 + ".png");

var heading = document.querySelector("h1");

if(randomDiceValue1 > randomDiceValue2) {
    heading.textContent = "⛳Player 1 Wins!";

} else if(randomDiceValue1 < randomDiceValue2) {
    heading.textContent = "Player 2 Wins!⛳";

} else {
    heading.textContent = "Draw!";
}
