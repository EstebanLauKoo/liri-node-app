var string = process.argv,
    operand = string[2],
    search = [],
    spotify = require('spotify'),
    omdb = require('request'),
    keys = require('./keys.js'),
    client = keys.twitterKeys,
    params = {screen_name: searchQuery}

    for (var i = 3; i < string.length; i++){
        search.push(string[i])
    }

    var searchQuery = search.join(" ")

console.log(searchQuery)
console.log(operand)

switch (operand) {
    case ('my-tweets'):
    twitterAPI()
    break
    case ('spotify-this-song'):
    spotifyAPI()
    break
    case ('movie-this'):
    omdbAPI()
    break
    case ('do-what-it-says'):
    dixby()
    break
}

function twitterAPI() {
// pass the require
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log([i+1]+ " " + tweets[i].text)
                }
            } else {
                throw error
            }
    });
// research how to make the api work
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
}
function spotifyAPI() {
//  This will show the following information about the song in your terminal/bash window

}
function omdbAPI() {

}
function dixby() {

}

