document.getElementById('search').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

async function fetchWeatherData(location) {
    const apiKey = '62496bfac74d40628db103958240709'; 
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.error) {
            alert('Location not found');
        } else {
            updateWeatherInfo(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherInfo(data) {
    const weather = data.current;
    const tempC = weather.temp_c;
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const day = date.toLocaleDateString('en-US', options);

    document.getElementById('day1').textContent = day.split(',')[0];
    document.getElementById('date1').textContent = day.split(',')[1];
    document.getElementById('temperature1').textContent = `${tempC}°C`;
    // document.getElementById('condition1').textContent = weather.condition.text;

    // Determine the appropriate weather logo based on temperature
    document.getElementById('weather-logo').src = getWeatherLogo(tempC);

    document.getElementById('precipitation').textContent = `${weather.precip_mm || 0} mm`;
    document.getElementById('humidity').textContent = `${weather.humidity}%`;
    document.getElementById('wind').textContent = `${weather.wind_kph} km/h`;
}

function getWeatherLogo(tempC) {
    if (tempC <= 0) {
        return 'snowflake.jpg'; 
    } else if (tempC <= 15) {
        return 'cloudy.png'; 
    } else if (tempC <= 25) {
        return 'weather1.png'; 
    } else {
        return 'sunny.png'; 
    }
}
