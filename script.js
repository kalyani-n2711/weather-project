const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
search.addEventListener('click', () => {
    const APIKey = 'aa0c16efb21a067cbc7cef7f604b2a9e';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            console.log("API response:", json); // ✅ Debug
if(json.cod=='404'){
    container.style.height='400px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.add('active');
    return;
}
 container.style.height='555px';
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description'); // ✅ You need this in HTML
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Set image based on weather condition
            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = 'images/clear.jpeg';
                    break;
                case 'rain':
                    image.src = 'images/rain.jpeg';
                    break;
                case 'snow':
                    image.src = 'images/snow.jpeg';
                    break;
                case 'clouds':
                    image.src = 'images/cloud.jpeg';
                    break;
                case 'mist':
                    image.src = 'images/mist.jpeg';
                    break;
                case 'haze':
                    image.src = 'images/haze.jpeg';
                    break;
                default:
                    image.src = 'images/cloud.jpeg';
            }

            // ✅ Correct use of template literals (use backticks ` `, not single quotes)
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;  // ✅ Corrected
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            weatherBox.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching weather:', error); 
            alert("Could not fetch weather data. Please check city name or internet.");
        });
});
