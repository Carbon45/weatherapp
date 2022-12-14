// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=acf4cf18d638fbb130d7a5783dd32cb0

let weather = {
    apiKey: "acf4cf18d638fbb130d7a5783dd32cb0",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) { // data is talking about the main data block from the weather API, this targets all the elements that we need
        const { name } = data;
        const { icon, description } = data.weather[0]; // looks at the data of the weather object and extracts the icon and the description
        const { temp, humidity } = data.main; 
        const { speed } = data.wind;
        document.querySelector('.city').innerText = `${name}`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°C";
        document.querySelector('.humidity').innerText = `Humidity: ${humidity} %`
        document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`
        document.querySelector('.weather').classList.remove('loading')
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
}

document.querySelector('.search button').addEventListener('click', function () {
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup', function(event) {
    if(event.key == "Enter") {
        weather.search()
        audio.play();
    }
});

weather.fetchWeather('London'); // the default weather display

const audio = new Audio();
audio.src = "mouseclick2.mp3";