$(document).ready(function() {

//button array
var topics = ["funny cat", "silly cat", "grumpy cat", "sleepy cat", "cats in boxes", "kittens", "cute cat", "cats in hats"];

//set up on page load
searchGifs("cat");
makeButtons();
$("#submitBtn").attr("disabled", true);

//disable make search button button so empty buttons arent made if it's pressed when text field is empty
$("#addSearchTerm").keyup(function() {
	if($(this).val().length != 0) {
		$("#submitBtn").attr("disabled", false);
	} else {
		$("#submitBtn").attr("disabled", true);
	}
})

//make a new search button by adding the new words to the array and calling the makeButtons function again
function newButton() {
	var newBtn = $("#addSearchTerm").val();
	topics.push(newBtn);
	$("#addSearchTerm").val("");
	makeButtons();
	searchGifs(newBtn);
}

//when you press make a new button button, it calls newButton function to make a new button
$("#submitBtn").click(function() {
	newButton();
	$("#submitBtn").attr("disabled", true);
})

//if you press enter instead of pressing the button, it still calls newButton
$("input").keyup(function(){  
  if (event.keyCode == 13) {
   	newButton();
   	$("#submitBtn").attr("disabled", true);
  }
});

//makes search buttons from the array of topics, including new topics submitted via the input box
function makeButtons() {
	$("#buttonDiv").empty()
	for (var i = 0; i < topics.length; i++) {
		var btnVal = encodeURIComponent(topics[i]);
		$("#buttonDiv").append("<button value='" + btnVal + "'>" + topics[i] + "</button>");
	} 
	$("button").click(function() {
		searchGifs(this.value);
	})
}

//uses giphy api to search for gifs based on search button criteria, limit is 100 results, results are shuffled so there aren't repeats in each individual search
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
			$("<div class='col-lg-3 col-md-4 col-xs-6 thumb'><div id='gifRating' class='thumbnail'><img src='" + staticGif + "' alt='' value='0' data-alt='" + animatedGif + "'/><p id='rating'>rating: " + rating + "</p></div></div>").appendTo($("#gifDiv"));
			}
			//switches image source from static to animated and back again on click
			$("img").click(function() {
				var val = $(this).attr("value");
				var data = $(this).attr("data-alt");
				var src = $(this).attr("src"); 
				if (val == 0) {
					$(this).attr("src", data);
					$(this).attr("data-alt", src);
					$(this).attr("value", "1");
				} else {
					$(this).attr("src", data);
					$(this).attr("data-alt", src);
					$(this).attr("value", "0");
				}				
			})
		})
}

});