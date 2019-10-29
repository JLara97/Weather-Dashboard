let userInput = $("#userInput");
let API_KEY = "ea06a85d5771cfcde655f972afd1fa0d";


$("#search").on("click", function (event) {

    event.preventDefault();

    userInput = userInput.val().trim();

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + ",us&units=imperial&appid=" + API_KEY;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        
        pastInput();

        let icon = data.weather[0].icon;
        let temp = data.main.temp;

    })
})

function pastInput() {

    localStorage.setItem("input", userInput);

    $("<div>").addClass("pastInputStyle").append($("<p>").text(userInput)).appendTo("#pastInput");
}