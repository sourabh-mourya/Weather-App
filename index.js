const API_KEY = '225d73bcbbf63dbefe00731a1a6846d4';
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const cityInput = document.getElementById('cityInput');

async function fetchData(city) {
    cityInput.value = '';    //ab wha place holder enter city ko khaali krwna hi jb city enter kr do to isliye apne city.valuue= space rkh denge to wo khaali ho jyega

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    let result = await response.json();
    
    if (result.message) {
        document.getElementById('secondDiv').innerHTML = `<h1>${city} ${result.message}</h1>`;
    } else {
        displayWeather(result);
    }
}

searchBtn.addEventListener('click', () => {
    fetchData(cityInput.value);
});

function displayWeather(result) {
    const div = `<div id="weatherInfo">
                    <p>${result.name}°C</p>
                    <p>${result.main.temp}</p>
                    <div>
                        <div>
                            <p>Wind</p>
                            <p>${result.wind.speed}km/h</p>
                        </div>
                        <div>
                            <p>Pressure</p>
                            <p>${result.main.pressure}</p>
                        </div>
                        <div>
                            <p>Humidity</p>
                            <p>${result.main.humidity}%</p>
                        </div>
                    </div>
                </div>`;
    document.getElementById('secondDiv').innerHTML = div;
}
//apne longitutunal aur latidunal se apni current location nikal lenge

locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            let result = await response.json();
            
            if (result.message) {
                document.getElementById('secondDiv').innerHTML = `<h1>${result.message}</h1>`;
            } else {
                displayWeather(result);
            }
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});