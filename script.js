const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=d2b6cbb301cc9b82439cc488b350ee22'
const API_UNITS = '&units=metric'
const API_LANG = '&lang=pl'

const getCities = () =>{
    const cities = input.value || 'Warszawa'
    const URL = API_LINK + cities + API_KEY + API_UNITS + API_LANG
    axios.get(URL)
    .then(res =>{
        console.log(res.data);
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const current = Object.assign({}, ...res.data.weather)
        

        weather.textContent = current.main
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
    })
}
getCities()

button.addEventListener('click', getCities)