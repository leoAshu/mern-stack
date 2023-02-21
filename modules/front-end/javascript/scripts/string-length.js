var message = prompt("Write your message.");

var limit = 140;
var count = message.length;

alert("You have written " + count + " characters. You have " + (limit - count) + " characters remaining.");