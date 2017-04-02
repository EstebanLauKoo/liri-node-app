var operand = process.argv[2],
    search = []
    for (var i = 3; i < process.argv.length; i++){
        search.push(process.argv[i])
    }
var keys = require('./keys.js'),
    client = keys.twitterKeys,
    spotify = require('spotify'),
    omdb = require('request'),
    fs = require('fs'),
    searchQuery = search.join(" "),
    params = {screen_name: searchQuery}

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

function spotifyAPI() {
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

function omdbAPI() {
    if (searchQuery == []) {

        omdb("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&r=json", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log(JSON.parse(body))
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).Title,
                    JSON.parse(body).Year,
                    JSON.parse(body).Country,
                    JSON.parse(body).Language,
                    JSON.parse(body).Plot,
                    JSON.parse(body).Actors,
                    JSON.parse(body).Ratings[1]
                )
            }
        })
    }
    else {
        omdb("http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&r=json", function (error, response, body) {

            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log(JSON.parse(body))
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).Title,
                    JSON.parse(body).Year,
                    JSON.parse(body).Country,
                    JSON.parse(body).Language,
                    JSON.parse(body).Plot,
                    JSON.parse(body).Actors,
                    JSON.parse(body).Ratings[1]
                )
            }
        })
    }
}
function dixby() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            throw error;
        }

        var dataArr = data.split(',')

        operand = dataArr[0]
        searchQuery = dataArr[1]

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
    })
}


