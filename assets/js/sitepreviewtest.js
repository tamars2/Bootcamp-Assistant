$(document).ready(function() {

var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.freecodecamp.com";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		
	}).error(function(err) {
		console.log("error: " + err);
	});

});