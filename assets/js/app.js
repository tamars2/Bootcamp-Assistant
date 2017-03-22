var category;

function buildTicker(category, zip) {
	var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + category + "&city=" + zip + "&pgcnt=5";
	//how do I prevent multiple calls?? OR overwrite ticker??
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		for (var i = 0; i < response.resultItemList.length; i++) {
			///any way to style these results?? ie : yellow bold - job name, white italic -company etc
			//need a settimeout , first result not visible
			//needs to open in new window
			$(".bxslider").append("<li><a id='job-link' href='" + response.resultItemList[i].detailUrl + "'>" + response.resultItemList[i].company + " is looking for a " + response.resultItemList[i].jobTitle + " in " + response.resultItemList[i].location + "</li>");
		}
		$("#job-link").click(function() {
			window.open(this.href);
			return false;
		});
		$(".bxslider").bxSlider({
			speed: 120000,
			slideMargin: 10,
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
	$(".job-category").on("click", function(event) {
		event.preventDefault();
		if ($(this).attr("data-category") != category) {
			$(".bxslider").empty();
			category = $(this).attr("data-category");
			buildTicker(category, 30309);
		}
	});
});