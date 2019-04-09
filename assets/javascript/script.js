//add to portfolio and submit the links
var submitButton = $("#submit-button");

var listOfAnimals = ["Cat", "Dog", "Sheep", "Giraffe", "Jellyfish", "Dolphin", "Cuttlefish", "Otter", "Poodle", "Horse", "Caterpillar"];

var requestedAnimal = "";












function showPictures(animal) {

    requestedAnimal = $(this).attr("data-animal");

    var giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + requestedAnimal + "&api_key=AwFTwhr0BP0eLWdTkSzndv6cVY2MVnhs&limit=10&rating=g"
    
    $.ajax({
        url: giphyUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);

        var apiContent = response.data;
        
        for (i = 0; i < apiContent.length; i++) {

            let pic = apiContent[i].images.downsized.url
            let imageCard = 
            `<div>
              <img src="${pic}" class="aniGif">
            </div>`;

            $("#picture-showcase").prepend(imageCard)
        }

    })

} //======== End of showPictures()==========================
    






//make buttons out of everything in listOfAnimals array
function makeAnimalButtons() {
    $("#button-panel").empty()

    for (i = 0; i < listOfAnimals.length; i++) {
    
        let critterButton = `
        <input type="button" value="${listOfAnimals[i]}" class="btn btn-info ani-button" data-animal="${listOfAnimals[i]}">
        `

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























