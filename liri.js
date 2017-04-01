var string = process.argv
var operand = string[2]
var twitter = require('twitter')
var spotify = require('spotify')
var omdb = require('request')
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
    Artist(s)
    The song's name
    A preview link of the song from Spotify
    The album that the song is from


    if no song is provided then your program will default to
    "The Sign" by Ace of Base
}
function omdbAPI() {
    This will output the following information to your terminal/bash window:
        * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.


        If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
    It's on Netflix!
}
function dixby() {

}

