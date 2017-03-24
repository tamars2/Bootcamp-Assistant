$(document).ready(function() {
	//////bookmark 1///////////
	$("#url-0").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.freecodecamp.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			///for big title?
			console.log(response.domain);
			///for link
			console.log(response.image.url);
			//sm text
			console.log(response.desc);
			//go to site link
			console.log(response.url);
			$("#url-0-image").attr("src", response.image.url)
			$("#url-0-title").text(response.domain);
			$("#url-0-second-title").text(response.title);
			$("#url-0-desc").text(response.desc);
			$("#url-0-site-link").click(function() {
				window.open(response.url);
				return false;
			});
		}).error(function(err) {
			console.log("error: " + err);
		});
	});
	////////bookmark 2/////////
	$("#url-1").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.codeacademy.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			///for big title?
			console.log(response.domain);
			///for link
			console.log(response.image.url);
			//sm text
			console.log(response.desc);
			//go to site link
			console.log(response.url);
			$("#url-1-image").attr("src", response.image.url)
			$("#url-1-title").text(response.domain);
			$("#url-1-second-title").text(response.title);
			$("#url-1-desc").text(response.desc);
			$("#url-1-site-link").click(function() {
				window.open(response.url);
				return false;
			});
		}).error(function(err) {
			console.log("error: " + err);
		});
	});
	////////third bookmark//////////
	$("#url-2").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.theodinproject.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			///for big title?
			console.log(response.domain);
			///for link
			console.log(response.image.url);
			//sm text
			console.log(response.desc);
			//go to site link
			console.log(response.url);
			$("#url-2-image").attr("src", response.image.url)
			$("#url-2-title").text(response.domain);
			$("#url-2-second-title").text(response.title);
			$("#url-2-desc").text(response.desc);
			$("#url-2-site-link").click(function() {
				window.open(response.url);
				return false;
			});
		}).error(function(err) {
			console.log("error: " + err);
		});
	});
});

////////fourth bookmark//////////
	$("#url-3").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.w3schools.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			///for big title?
			console.log(response.domain);
			///for link
			console.log(response.image.url);
			//sm text
			console.log(response.desc);
			//go to site link
			console.log(response.url);
			$("#url-3-image").attr("src", response.image.url)
			$("#url-3-title").text(response.domain);
			$("#url-3-second-title").text(response.title);
			$("#url-3-desc").text(response.desc);
			$("#url-3-site-link").click(function() {
				window.open(response.url);
				return false;
			});
		}).error(function(err) {
			console.log("error: " + err);
		});
	});