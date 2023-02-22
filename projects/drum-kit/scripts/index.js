var buttons = document.querySelectorAll(".drum");

for(var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        playSound(this.innerHTML);
        animateButton(this.innerHTML);
    });
}

document.addEventListener("keydown", function (event) {
    playSound(event.key);
    animateButton(event.key);
});

function playSound(key) {

    var audio;

    switch (key) {
        case "w":
            audio = new Audio("./sounds/tom-1.mp3");
            break;
        case "a":
            audio = new Audio("./sounds/tom-2.mp3");
            break;
        case "s":
            audio = new Audio("./sounds/tom-3.mp3");
            break;
        case "d":
            audio = new Audio("./sounds/tom-4.mp3");
            break;
        case "j":
            audio = new Audio("./sounds/snare.mp3");
            break;
        case "k":
            audio = new Audio("./sounds/crash.mp3");
            break;
        case "l":
            audio = new Audio("./sounds/kick-bass.mp3");
            break;
        default:
            console.log(this.innerHTML);
            break;
    }

    audio.play();
}

function animateButton(key) {
    var activeButton = document.querySelector("." + key);
    
    activeButton.classList.add("pressed");
    
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}
