function formatDate() {
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = now.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    let formattedDate = `${day} ${hours}:${minutes}`;
    return formattedDate;
  }
  let now = new Date();
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(now);
  
  //console.log(formatDate(now));

  function search(city){
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeatherCondition, function () {
      alert("Enter a valid city name! 🌍");
    });
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    let city= document.querySelector("#search-input").value;
    search(city);
  }
  
  function displayWeatherCondition(response){
  document.querySelector("#city").innerHTML = response.data.name;
  let celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  
  
//show units
  
let celsiusTemp = null;
  function showFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temperature");
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    currentTemp.innerHTML = Math.round(fahrenheitTemp);
  }
  
  
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", showFahrenheit);
  
  function showCelsius(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#temperature");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    
    currentTemp.innerHTML= Math.round(celsiusTemp);
  }
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showCelsius);
  
  
  // Current location
 
 let currentLocationButton= document.querySelector("#current-location");
 currentLocationButton.addEventListener("click", getCurrentLocation)
  
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  function searchLocation(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);


  }

  search("Cape Town");

