//add to portfolio and submit the links
var submitButton = $("#submit-button");

var listOfAnimals = ["Cat", "Dog", "Sheep", "Giraffe", "Jellyfish", "Dolphin", "Cuttlefish", "Otter", "Poodle", "Horse", "Caterpillar"];

var requestedAnimal = "";

function showPictures() {

    requestedAnimal = $(this).attr("data-animal");
    console.log(requestedAnimal)

    var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + requestedAnimal + "&api_key=AwFTwhr0BP0eLWdTkSzndv6cVY2MVnhs&limit=10&rating=g"
    
    $.ajax({
        url: giphyUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var apiContent = response.data;
    
        for (i = 0; i < apiContent.length; i++) {
    
            var imageCard = $("<div>")
            imageCard.attr("class", "card picture-card")
            var gifImage = $("<img>")
            gifImage.attr("class", "card-img-top img-responsive ani-pic")
//gifImage should be inside imageCard
            var movingGif = apiContent[i].images.downsized.url;

            var stillGif = apiContent[i].images.downsized_still.url

            var imgRating = apiContent[i].rating;
            var ratingDisplay = $("<h4>")
            ratingDisplay.attr("class", "card-title")
            ratingDisplay.text("Rating: " + imgRating);
console.log(ratingDisplay.text())



            gifImage.attr("data-still", stillGif)
            gifImage.attr("data-moving", movingGif)
            gifImage.attr("data-gif-currently-moving", "true")
            gifImage.attr("class", "loadedGif")
            gifImage.attr("src", movingGif)

            imageCard.append(ratingDisplay)
            
            imageCard.append(gifImage)

            $("#picture-showcase").prepend(imageCard)
        }

        $(".loadedGif").on("click", function() {
            //==========================================
            //for some reason, it pauses the ones most recently loaded, but it just restarts the older ones. not sure why.
            //==========================================
            if ($(this).attr("data-gif-currently-moving") === "true") {
                //change state to false
                $(this).attr("src", $(this).attr("data-still"))

                $(this).attr("data-gif-currently-moving", "false");
                //replace the link with still-gif
            } else {
                $(this).attr("src", $(this).attr("data-moving"))
                $(this).attr("data-gif-currently-moving", "true");
                //replace the link with still-gif
                
            }
        })


    })

} //======== End of showPictures()==========================
    






//make buttons out of everything in listOfAnimals array
function makeAnimalButtons() {
    $("#button-panel").empty()

    for (i = 0; i < listOfAnimals.length; i++) {
    
    var critterButton = $("<button>");
    critterButton.attr("class", "btn btn-info ani-button");
    critterButton.text(listOfAnimals[i]);
    critterButton.attr("data-animal", listOfAnimals[i])
    $("#button-panel").append(critterButton);
};
}
makeAnimalButtons();
function addButton() {
    event.preventDefault()

var animalInput = $("#animal-input").val().trim();



    listOfAnimals.push(animalInput)
makeAnimalButtons();
}



$(document).on("click", ".ani-button", showPictures);



$(document).on("click", "#submit-button", addButton)























