const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=d2b6cbb301cc9b82439cc488b350ee22";
const API_UNITS = "&units=metric";
const API_LANG = "&lang=pl";

const getCities = () => {
  const cities = input.value || "Warszawa";
  const URL = API_LINK + cities + API_KEY + API_UNITS + API_LANG;
  axios.get(URL).then((res) => {
    console.log(res.data);
    const temp = res.data.main.temp;
    const hum = res.data.main.humidity;
    const status = Object.assign({}, ...res.data.weather);

    cityName.textContent =
      input.value.charAt(0).toUpperCase() + input.value.slice(1);
    weather.textContent = status.main;
    temperature.textContent = Math.floor(temp) + "°C";
    humidity.textContent = hum + "%";

    if (status.id >= 200 && status.id <= 232) {
      photo.setAttribute("src", "./img/thunderstorm.png");
      weather.textContent = "Burzowo";
    } else if (status.id >= 300 && status.id <= 321) {
      photo.setAttribute("src", "./img/drizzle.png");
      weather.textContent = "Mżawka";
    } else if (status.id >= 500 && status.id <= 531) {
      photo.setAttribute("src", "./img/rain.png");
      weather.textContent = "Deszczowo";
    } else if (status.id >= 600 && status.id <= 622) {
      photo.setAttribute("src", "./img/snow.png");
      weather.textContent = "Śnieg";
    } else if (status.id >= 701 && status.id <= 781) {
      photo.setAttribute("src", "./img/fog.png");
      weather.textContent = "Mgła";
    } else if (status.id === 800) {
      photo.setAttribute("src", "./img/sun.png");
      weather.textContent = "Słonecznie";
    } else if (status.id >= 801 && status.id <= 804) {
      photo.setAttribute("src", "./img/cloud.png");
      weather.textContent = "Pochmurno";
    } else {
      photo.setAttribute("src", "./img/unknown.png");
    }
  });
};

const enterEvent = (e) => {
  if (e.key === "Enter") {
    getCities();
  }
};
input.addEventListener("keyup", enterEvent);
button.addEventListener("click", getCities);
