var string = process.argv
var operand = string.slice(2).join(' ')
var twitter = require('twitter')
var spotify = require('spotify')
var omdb = require('request')
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

