var submitButton = $("#submit-button");

var listOfAnimals = ["Cat", "Dog", "Sheep", "Giraffe", "Jellyfish", "Dolphin", "Cuttlefish", "Otter", "Poodle", "Horse", "Caterpillar"];

var requestedAnimal = "";

function showPictures() {

    requestedAnimal = $(this).attr("data-animal");
    console.log(requestedAnimal)

    var giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + requestedAnimal + "&api_key=AwFTwhr0BP0eLWdTkSzndv6cVY2MVnhs&limit=5&rating=g"
    
    $.ajax({
        url: giphyUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var apiContent = response.data;
    
        for (i = 0; i < apiContent.length; i++) {
    
            var gifImage = $("<img>")

            var movingGif = apiContent[i].images.fixed_width_small.url;

            var stillGif = apiContent[i].images.fixed_width_small_still.url

            var imgRating = apiContent[i].rating;
            var ratingDisplay = $("<p>")
            ratingDisplay.text("Rating: " + imgRating);

            gifImage.attr("data-still", stillGif)
            gifImage.attr("data-moving", movingGif)
            gifImage.attr("data-gif-currently-moving", "true")
            gifImage.attr("class", "loadedGif")
            gifImage.attr("src", movingGif)

            gifImage.append(ratingDisplay)

            $("#picture-showcase").prepend(gifImage)
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

}
    






//make buttons out of everything in listOfAnimals array
function makeAnimalButtons() {
    $("#button-panel").empty()

    for (i = 0; i < listOfAnimals.length; i++) {
    
    var critterButton = $("<button>");
    critterButton.attr("class", "btn btn-info ani-button");
    critterButton.text(listOfAnimals[i]);
    //just added this thing below. need to figure out how to make it so when you click the button, it prints appropriate gifs
    critterButton.attr("data-animal", listOfAnimals[i])
    $("#button-panel").append(critterButton);
};
}
makeAnimalButtons();
//make it so when you put a thing in the search box and hit search it adds it to the listOfAnimals array.
function addButton() {
    event.preventDefault()

var animalInput = $("#animal-input").val().trim();



    listOfAnimals.push(animalInput)
makeAnimalButtons();
}



$(document).on("click", ".ani-button", showPictures);



$(document).on("click", "#submit-button", addButton)























