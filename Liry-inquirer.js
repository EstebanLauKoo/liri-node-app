/**
 * Created by esteb on 4/3/2017.
 */
var inquirer = require('inquirer'),
    keys = require('./keys.js'),
    client = keys.twitterKeys,
    spotify = require('spotify'),
    omdb = require('request'),
    fs = require('fs')
inquirer.prompt ([
    {
        type: "input",
        name: "request",
        message: "what would you like to do ('my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says')"
    }
])
    .then(function (answer) {
        var operand = answer.request
        if (operand === "my-tweets") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "tweetQuery",
                    message: "Who would you like to stalk?"
                }
            ])
                .then(function (answer) {
                    console.log(answer.tweetQuery)
                    var params = {screen_name: answer.tweetQuery}
                    twitterAPI(params)
                })
        }
        else if (operand === "spotify-this-song") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "spotifyQuery",
                    message: "What song are you looking for?"

                }
            ])
                .then(function (answer) {
                    console.log(answer.spotifyQuery)
                    var searchQuery = answer.spotifyQuery
                    spotifyAPI(searchQuery)
                })
        }
        else if (operand === "movie-this") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "omdbQuery",
                    message: "what movie are you looking for?"
                }
            ])
                .then(function (answer) {
                    console.log(answer.omdbQuery)
                    var searchQuery = answer.omdbQuery
                    omdbAPI(searchQuery)
                })
        }
        else if (operand === "do-what-it-says")
        {
            fs.readFile('random.txt', 'utf8', function (error, data) {
                if (error) {
                    throw error;
                }
                var dataArr = data.split(',')

                operand = dataArr[0]
                searchQuery = dataArr[1]
                console.log(searchQuery)
                console.log(operand)
                switch (operand) {
                    case ('spotify-this-song'):
                        spotifyAPI(searchQuery)
                        break
                    case ("my-tweets"):
                        twitterAPI(searchQuery)
                        break
                    case ("movie-this"):
                        omdbAPI(searchQuery)
                        break
                }
            })
        }
    })

function twitterAPI(params) {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log([i+1]+ " " + tweets[i].text + " " + "created at " + tweets[i].created_at)
            }
        } else {
            throw error
        }

    });
}

function spotifyAPI(searchQuery) {
    if (searchQuery == []) {
        spotify.lookup({type: 'track', id: "3DYVWvPh3kGwPasp7yjahc"}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log("Well check these guys out")
            console.log("Artist: " + data.artists[0].name)
            console.log("Track: " + data.name)
            console.log("Have a listen: " + data.preview_url)
            console.log("Album: " + data.album.name)


        })
    }

    else {
        spotify.search({type: 'track', query: searchQuery}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Have a listen: " + data.tracks.items[0].preview_url)
            console.log("Track: " + data.tracks.items[0].name)
        })

    }
}

function omdbAPI(searchQuery) {
    if (searchQuery == []) {

        omdb("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&r=json", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var omdbData= JSON.parse(body)

                console.log("imdbRating: " + omdbData.imdbRating)
                console.log("Title: " + omdbData.Title)
                console.log("Year: " + omdbData.Year)
                console.log("Country: " + omdbData.Country)
                console.log("Language: " + omdbData.Language)
                console.log("Plot: " + omdbData.Plot)
                console.log("Actors: " + omdbData.Actors)
                console.log("Rotten tomato rating: " + omdbData.Ratings[1])

            }
        })
    }
    else {
        omdb("http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&r=json", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                var omdbData= JSON.parse(body)
                console.log("imdbRating: " + omdbData.imdbRating);
                console.log("Title: " + omdbData.Title)
                console.log("Year: " + omdbData.Year)
                console.log("Country: " + omdbData.Country)
                console.log("Language: " + omdbData.Language)
                console.log("Plot: " + omdbData.Plot)
                console.log("Actors: " + omdbData.Actors)
                console.log("Rotten tomato rating: " + omdbData.Ratings[1])

            }
        })
    }
}







