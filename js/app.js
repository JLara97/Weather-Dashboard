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

        console.log(data);

        pastInput();

        let city = data.name;
        let icon = data.weather[0].icon;
        let temp = data.main.temp;
        let wind = data.wind.speed;
        let humid = data.main.humidity;
        let uvIndex = 0;

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + API_KEY + "&lat=" + data.coord.lat + "&lon=" + data.coord.lon,
            method: "GET"
        }).then(function (uv) {

            uvIndex = uv.value;
        })

        $("<div>").addClass("mainWeatherStyle").append($("<h2>").text(city)).append($("<h4>").text("Temperature: " + temp + " F")).append($("<h4>").text("Wind Speed: " + wind + " mph")).append($("<h4>").text("Humidity: " + humid + "%")).append($("<h4>").text("UV Index: " + uvIndex)).appendTo("#mainWeather");


    })

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + API_KEY + "&units=imperial",
        method: "GET"
    }).then(function (data) {
        for (var i = 0; i < data.list.length; i++) {
            if ((i + 1) % 8 === 0) {
                $("<div>").addClass("card", "text-center", "text-white", "bg-primary").append($("<div>").addClass("card-body")).append(
                    $("<div>").append($("<p>").text("Temp: " + data.list[i].main.temp),
                        $("<p>").text("Hum. : " + data.list[i].main.humidity))).appendTo("#forecast");
            }
        }
    })
})

function pastInput() {

    localStorage.setItem("input", userInput);

    $("<div>").addClass("pastInputStyle").append($("<p>").text(userInput)).appendTo("#pastInput");
}