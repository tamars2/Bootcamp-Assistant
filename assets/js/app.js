var category;

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
		$(".bxslider").append("<li><a class='list'  href='" + response.resultItemList[i].detailUrl + "' id=choice-" + [i] + ">" + response.resultItemList[i].company + " is looking for a " + response.resultItemList[i].jobTitle + " in " + response.resultItemList[i].location + "</li>");
				

		$("#choice-" + i, this).click(function() {
			window.open("href", _blank);
			return false;
		});
			}
	
		$(".bxslider").bxSlider({
			speed: 90000,
			slideMargin: 0,
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
	buildTicker(30305);
}); 






