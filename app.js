/ this is for background color change
$(".colorBlock").click(function() {
   var $backgroundColor = $(this).css("background-color");
   $("body").css("background-color", $backgroundColor);
 });


 var arrayOfElements = ["Dog", "Fish","Cow","Bird","Japan","China","NorthKorea"]

 $(document).ready(buildButtonArray())
 function buildButtonArray () {
   $(".buttonList").empty()
   for (i in arrayOfElements) {
     $(".buttonList").append("<button type='button' onclick='callGiphy( &quot; " + arrayOfElements[i] +" &quot; );'> " + arrayOfElements[i] + " </button>  ")
   }
 }
 
 // using proper XML entity representation of &quot;
 
 function callGiphy(target) {
   console.log(target)
   $.getJSON("https://api.giphy.com/v1/gifs/search?q=" + target + "&api_key=Zp7besOucQuLRcQnucf538giZH8iOvlH&limit=20", function(result){
         //console.log(result.data)
           $(".result").empty()
             for (i in result.data) {
                 $(".result").append("<iframe src=" +  result.data[i].embed_url + "></iframe> <br> <p> Rated " + result.data[i].rating + " <br>");
             };
         });
 }
 
 function addToArray() {
   var result = $(".newValue").val()
   console.log(result)
   arrayOfElements.push(result)
   buildButtonArray();
 }