$(document).ready(function() {

var topics = ["funny cat", "silly cat", "grumpy cat", "sleepy cat", "cats in boxes", "kittens", "cute cat", "cats in hats"];

searchGifs("cat");
makeButtons();

function newButton() {
	var newBtn = $("#addSearchTerm").val();
	topics.push(newBtn);
	$("#addSearchTerm").val("");
	makeButtons();
	searchGifs(newBtn);
}

$("#submitBtn").click(function() {
	newButton();
})

$("input").keyup(function(){  
  if (event.keyCode == 13) {
   	newButton();
  }
});

function makeButtons() {
	$("#buttonDiv").empty()
	for (var i = 0; i < topics.length; i++) {
		var btnVal = topics[i].replace(/\s/, "+");
		$("#buttonDiv").append("<button value='" + btnVal + "'>" + topics[i] + "</button>");
	} 
	$("button").click(function() {
		searchGifs(this.value);
	})
}

function searchGifs(searchTerm) {
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=100&rating=",
		method: "GET"
		}).done(function(response) {
			$("#gifDiv").empty();
			response.data.sort(function() {
	      return 0.5 - Math.random();
	    });
			for (var i = 0; i < 10; i++) {
			var staticGif = response.data[i].images.fixed_height_still.url;
			var animatedGif = response.data[i].images.fixed_height.url;
			var rating = response.data[i].rating;
			$("<div class='col-lg-3 col-md-4 col-xs-6 thumb'><div id='gifRating' class='thumbnail'><img src='" + staticGif + "' alt='' value='0' data='" + animatedGif + "'/><p id='rating'>rating: " + rating + "</p></div></div>").appendTo($("#gifDiv"));
			}
			$("img").click(function() {
				var val = $(this).attr("value");
				var data = $(this).attr("data");
				var src = $(this).attr("src"); 
				if (val == 0) {
					$(this).attr("src", data);
					$(this).attr("data", src);
					$(this).attr("value", "1");
				} else {
					$(this).attr("src", data);
					$(this).attr("data", src);
					$(this).attr("value", "0");
				}				
			})
		})
}

});