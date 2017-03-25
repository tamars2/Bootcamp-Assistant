var category;
var zipCode = localStorage.getItem("zip");
console.log(zipCode);

function buildTicker(zip) {
	var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=javascript+full+stack&city=" + zip + "&pgcnt=5";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.resultItemList.length; i++) {
			var linkUrl = response.resultItemList[i].detailUrl;

			///any way to style these results?? ie : yellow bold - job name, white italic -company etc
			//need a settimeout , first result not visible
		$(".bxslider").append("<li><a class='list' href='" + response.resultItemList[i].detailUrl + "' id=choice-" + [i] + ">" + response.resultItemList[i].company + " is looking for a " + response.resultItemList[i].jobTitle + " in " + response.resultItemList[i].location + "</li>");
				
		$(".list").on('click', function(e) {
			window.open(e.target.href);
			return false;
		});
			}
	
		$(".bxslider").bxSlider({
			speed: 90000,
			slideMargin: 30,
			infiniteLoop: true,
			ticker: true,
			tickerHover: true,
		});
	}).error(function(err) {
		console.log("error: " + err);
	});
}

$(document).ready(function() {
	///////MOTIVATIONAL QUOTE///////
	// http://api.jquery.com/jquery.getjson/#jsonp
	$('#quoteGETJSON').click(function() {
		$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update).fail(handleErr);
	});
	$.ajax({
		url: "http://api.forismatic.com/api/1.0/",
		jsonp: "jsonp",
		dataType: "jsonp",
		data: {
			method: "getQuote",
			lang: "en",
			format: "jsonp"
		}
	}).done(function(result) {
		var blockquote = $("#motiv-quote");
		$("#motiv-quote").html(result.quoteText);
		var cite = $("<cite>");
		blockquote.append(cite);
		cite.text(result.quoteAuthor);
	});

	///////JOB TICKER ///////
	//alt working solution//
	buildTicker(zipCode);



////////DATE & TIME IN FOOTER//////////
$("#date-time").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
	
//////bookmark 1///////////
	$("#url-0").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.codeacademy.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#url-0-image").attr("src", response.image.url);
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
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fteamtreehouse.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#url-1-image").attr("src", response.image.url);
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


	////////bookmark 3//////////
	$("#url-2").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.freecodecamp.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#url-2-image").attr("src", response.image.url);
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
	
	////////bookmark 4//////////
	$("#url-3").on("click", function() {
		var queryURL = "http://unfurl.oroboro.com/unfurl?url=http%3A%2F%2Fwww.codewars.com";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			$("#url-3-image").attr("src", response.image.url);
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

	$('#logout').on("click", function() {
	document.location.href = "http://frozen-forest-67094.herokuapp.com/login.html";
	});

});

