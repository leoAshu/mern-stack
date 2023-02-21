var tweet = prompt("Compose your tweet.");

var tweetLimit = 140;
// var tweetCount = tweet.length;

// alert("You have written " + tweetCount + " characters. You have " + (tweetLimit - tweetCount) + " characters left.");

var trimmedTweet = tweet.slice(0, tweetLimit+1);
alert(trimmedTweet);