$(document).ready(function(){
	var codeSubjects= "Rickrolled";
function JScheck(){
	console.log("Youtubepop loaded");
	console.log("codeSubjects is " + codeSubjects);
};
JScheck();

$("#html").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#html").attr("data-category");
	console.log(codeSubjects);
youtubeQuery();
});
$("#CSS").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#CSS").attr("data-category");
youtubeQuery();
});
$("#Bootstrap").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#Bootstrap").attr("data-category");
youtubeQuery();
});
$("#Javascript").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#Javascript").attr("data-category");
youtubeQuery();
});
//node.js
$("#X").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#X").attr("data-category");
youtubeQuery();
});
$("#MongoDB").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#MongoDB").attr("data-category");
youtubeQuery();
});
$("#MySQL").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("MySQL").attr("data-category");
youtubeQuery();
});
$("#React").on("click", function(event){
	event.preventDefault();
	console.log("click");
	codeSubjects = $("#React").attr("data-category");
youtubeQuery();
});

//you tube search function
function youtubeQuery(){

	//Loading image and clear div 
	$("#video-cards").empty();
	$("#video-cards").html("<img id='load' src='assets/images/loading.gif'>")
	console.error(codeSubjects);
//Search with 10 results, relevance, snippet, embeddable, safesearch enabled, and english
var queryURL= "https://content.googleapis.com/youtube/v3/search?maxResults=20&order=relevance&part=snippet&q="+codeSubjects+" Tutorials&relevanceLanguage=en&safeSearch=strict&type=video&videoEmbeddable=true&key=AIzaSyCIq_oK2ULb7FUPyEjRiVn7gVicyuiHmag";
//api call 
$.ajax({
url: queryURL,
method: "GET"
}).done(function(response){
console.log(response);
$("#video-cards").empty();

for (var i = 0; i < response.items.length; i++) {
	//card creation wiht video title and description
$("#video-cards").append('<div class="col-md-3 card-type">'+'<div class="pmd-card pmd-card-default pmd-z-depth-2 pmd-card-custom-view">'+'<div class="pmd-card-media">'+'<iframe  id= "video" src="https://www.youtube.com/embed/'+response.items[i].id.videoId +'"frameborder="0" allowfullscreen></iframe>'+'</div>'+ '<div class="pmd-card-title">'+'<h2 class="pmd-card-title-text">'+response.items[i].snippet.title+'</h2>');
// reenable for description//+'<span class="pmd-card-subtitle-text">'+response.items[i].snippet.description+'</span>'+'</div></div></div>');
}
});
};

 
});
