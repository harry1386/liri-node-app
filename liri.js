var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var twitterKeys = keys.twitterKeys;
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
	id: '2c165884503045f88b73d13ac755cbcb',
	secret: '0e61e5fda0384606b25f8a7b2c473058'
});
var random = "./random.txt";

var command = process.argv[2];
var inputs = process.argv[3];
				for(i=4; i<process.argv.length; i++){
					input += '+' + process.argv[i];
				}

function movie(){
	if(inputs === undefined){
		inputs = "Mr. Nobody"
	};

	request("http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy", function(error, response, body){
	if (!error && response.statusCode === 200) {
		var json = JSON.parse(body);

		var results = "Title: " + json.Title + "\nYear: " + json.Year + "\nIMDB Rateing: " + json.imdbRating + "\nRotten Tomatoes Rating: " + json.Ratings[2].value + "\nLanguage: " + json.Language + "\nPlot: " + json.Plot + "\nActors" + json.Actors
		console.log(results);
		}
	});

};

function tweet(){
	var params = {screen_name: twitterUsername, count: 20};
	var twitterUsername = 'tsar1386';
	var client = new twitter(keys);
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  		for(i=0; i < tweets.length; i++){
  			var tweetNum = ("Tweet#: " + (i+1) + "\nTime: " + tweets[i].created_at + "Text: " + tweets[i].text + "\n");
  		}
    console.log(tweetNum);
  		}
	});
}

function spot(){
	if(inputs === undefined){
		inputs = "Queen";
	}

	spotify.search({ type: 'track', query: inputs,  limit: 1 }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		} 

  		console.log("\nArtist: " + data.tracks.items[0].artists[0].name +
  			"\nSong: " + data.tracks.items[0].name + "\nSpotify Link: " 
  			+ data.tracks.items[0].external_urls.spotify + "\nAlbum: " + data.tracks.items[0].album.name)

  });
};

function doWhat(){
	fs.readFile("random.txt", "utf8", function(error, data){
			if(error){
				return console.log(err)
			}
			var dataArr = data.split(",");
			command = dataArr[0];
			inputs = dataArr[1];

			app();


	});
};
  	

function app(){
switch(command){
	case"movie-this":
		movie();
	break
	case"my-tweets":
		tweet();
	break
	case"spotify-this-song":
		spot();
	break
	case"do-what-it-says":
		doWhat();
	break
};
};

app();