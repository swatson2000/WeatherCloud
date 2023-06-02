var units = "m"; // Default temperature unit (Celsius)

function updateUnits() {
  var unitsDropdown = document.getElementById("units");
  units = unitsDropdown.value;
}

function getWeather() {
  var city = document.getElementById("search").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch("http://api.weatherstack.com/current?access_key=682a0755d2346dbb0c1648365897109a&query=" + city + "&units=" + units)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("Error: " + data.error.info);
        return;
      }

      var name = data.location.name;
      var country = data.location.country;
      var region = data.location.region;
      var lon = data.location.lon;
      var lat = data.location.lat;
      var temperature = data.current.temperature;

      // Display the retrieved data on the page
      document.getElementById("output").innerHTML = "<h1>Results</h1>" +
        "Name: " + name + "<br>" +
        "Country: " + country + "<br>" +
        "Region: " + region + "<br>" +
        "Longitude: " + lon + "<br>" +
        "Latitude: " + lat + "<br>" +
        "Temperature: " + temperature + getTemperatureUnit();
    })
    .catch(error => {
      console.log(error);
    });
}

function getTemperatureUnit() {
  return units === "f" ? "°F" : "°C";
}
