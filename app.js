$(document).ready(function(){

  
    var gifs = ["cars", "trucks", "buses", "airplane"];

 
    function displayGifInfo() {
        var dataGiphy = $(this).attr("data-gif");
        var random = Math.floor(Math.random() * (100 - 2)) + 2;

        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            dataGiphy + "&api_key=dc6zaTOxFJmzC" + "&offset=" + random;

        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                
                var gifImage = $("<img>");
                
                gifImage.attr("src", results[i].images.fixed_height.url);
                
                gifImage.addClass("control");
                
                gifImage.attr("data-still", results[i].images.fixed_height.url);
                
                gifImage.attr("data-animate", results[i].images.fixed_height_still.url);
                
                gifImage.attr("data-state", "still");
                
                $("#gifs-appear-here").prepend(gifImage);


            }

            
            $(".control").on("click", function() {
                var state = $(this).attr("data-state");
    
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        });
    };

    
    function renderButtons() {
        
        $("#newGif").empty();
        
        $("#userInput").val("");

        
        for(i = 0; i < gifs.length; i++) {
            
            var newButton = $("<button>")
                
                .addClass("gifFormat btn btn-primary")
                
                .attr("data-gif", gifs[i])
                
                .text(gifs[i]);
            
            $("#newGif").append(newButton);
        }
    };

    
    $("#add-gif").on("click", function(event) {
        
        
        event.preventDefault();

        
        var userInput = $("#userInput").val();

        
        if (userInput.length != 0 && gifs.indexOf(userInput) === -1) {
          gifs.push(userInput);
          $("#userInput").val();
          renderButtons();
        } else {
          $("#userInput").val("");
        }
    });

    $("#clear-gif").on("click", function(event) {

        
        event.preventDefault();

        $("#gifs-appear-here").empty();

    })

    $(document).on("click", ".gifFormat", displayGifInfo);

    renderButtons(); 
})
