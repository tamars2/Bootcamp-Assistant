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
	})
	///////JOB TICKER ///////
	$("#front-end").on("click", function() {
			var language = "front+end+javascript";
			//need code for login screen
			var zip = 30305;
			var queryURL = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=" + language + "&city=" + zip + "&pgcnt=20";
			var tickerDiv = $("<div>");
			tickerDiv.appendTo(".navbar-fixed-bottom");
			var tickerList = $("<ul>");
			tickerList.addClass("bxslider");
			tickerList.appendTo(tickerDiv);
			//how do I prevent multiple calls?? OR overwrite ticker??
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				for (var i = 0; i < response.resultItemList.length; i++) {
					$(".bxslider").empty();
					///any way to style these results?? ie : yellow bold - job name, white italic -company etc
					$(".bxslider").append("<li><a href='" + response.resultItemList[i].detailUrl + "'>company: " + response.resultItemList[i].company + " , job title: " + response.resultItemList[i].jobTitle + " , location: " + response.resultItemList[i].location + "</li>")
				}
				$(".bxslider").bxSlider({
					speed: 350000,
					slideMargin: 100,
					infiniteLoop: true,
					ticker: true,
					tickerHover: true,
				});
			}).error(function(err) {
				console.log("error: " + err);
			});
		})

});