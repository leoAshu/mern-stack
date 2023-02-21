var tweet = prompt("Compose your tweet.");

var limit = 140;
var tweetCount = tweet.length;

alert("You have written " + tweetCount + " characters. You have " + (limit - tweetCount) + " characters left.");