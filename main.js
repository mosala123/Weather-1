document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[today.getDay()];
  const month = today.toLocaleString('default', { month: 'long' });
  const date = today.getDate();

  document.getElementById('day').textContent = `${dayName}, ${month} ${date}`;

  // Get user's permission to access location
  if (confirm("Allow us to use your location to calculate the temperature in your area ?")) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
      alert( "Location is not supported in this browser.");
    }
  } else {
    alert("Permission has not been granted to access the site.");
  }
});

document.getElementById("submit").addEventListener("click", function () {
  const city = document.getElementById("input").value;
  const apiKey = "1b4aee5ef4c0949a309e9f08b95aba1f";  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (city != "") {
        document.getElementById("temperature").textContent = `TEMP: ${data.main.temp} °C`;
        document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;
        document.getElementById("weather").textContent = `SKC: ${data.weather[0].description}`;
        document.getElementById("humidity-value").textContent = `RH: ${data.main.humidity}%`;
        clear();
      } else {
        alert("Please choose the city first.");
        clearData();
      }
    });
});

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "1b4aee5ef4c0949a309e9f08b95aba1f";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("temperature").textContent = `TEMP: ${data.main.temp} °C`;
      document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;
      document.getElementById("weather").textContent = `SKC: ${data.weather[0].description}`;
      document.getElementById("humidity-value").textContent = `RH: ${data.main.humidity}%`;
    });
}

 

function clearData() {
  document.getElementById("input").value = "";
  document.getElementById("temperature").textContent = "";
  document.getElementById("wind").textContent = "";
  document.getElementById("weather").textContent = "";
  document.getElementById("humidity-value").textContent = "";
}

function clear() {
  document.getElementById("input").value = "";
}

document.getElementById("input").addEventListener("input", function () {
  if (this.value === "") {
    clearData();
  }
});




































// document.getElementById("submit").addEventListener("click", function () {
//   const city = document.getElementById("input").value;
//   const apiKey = "1b4aee5ef4c0949a309e9f08b95aba1f";  
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       if (input.value != "") {
//         document.getElementById(
//           "temperature"
//         ).textContent = `${data.main.temp} °C`;
//         document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
//         document.getElementById("sky").textContent =
//           data.weather[0].description;
//           clear()
//       } else {
//         alert("Please select or enter a city.");
//         clearData() 
//       }
     
//     });
   
// });


function clearData() {
  document.getElementById("input").value = "";
  document.getElementById("temperature").innerHTML = "";
  document.getElementById("wind").innerHTML = "";
  document.getElementById("sky").innerHTML = "";
}
function clear() {
  document.getElementById("input").value = "";
}

document.getElementById("input").addEventListener("input", function () {
  if (this.value === "") {
    clearData();
  }
});