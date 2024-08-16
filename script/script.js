const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");
const displayData = document.getElementById("show-data");
const searchAgainBtn = document.getElementById("search-again");
const url = "https://api.tomorrow.io/v4/weather/realtime?"
const locationPart = "location=";
const apikey = "&apikey=osYAcjeR9Kjhazsp2wWsb82ID5vLezOd";
searchAgainBtn.style.display = "none";

const fetchData = async () => {
    try {
        userInput.style.display = "none";
        searchBtn.style.display = "none";
        searchAgainBtn.style.display = "block";
        const res = await fetch(`${url}${locationPart}${userInput.value}${apikey}`);
        const data = await res.json();
        const weatherInfo = pullData(data);
        const { locationName, temperatureF, humidity, dewPointF, visibilityM, windSpeedMPH, windDirection, cardinalDirection, precipitationProbability } = weatherInfo;
        displayData.innerHTML = `
            <div id="testing">
                <div class="inner-testing">
                    <p>Location: ${locationName}</p>
                    <p>Temperature: ${temperatureF} °F</p>
                    <p>Humidity: ${humidity} %</p>
                    <p>Dew Point: ${dewPointF} °F</p>
                    <p>Visibility: ${visibilityM} miles</p>
                    <p>Wind Speed: ${windSpeedMPH} mph</p>
                    <p>Wind Direction: ${cardinalDirection} (${windDirection} °)</p>
                    <p>Precipitation Probability: ${precipitationProbability} %</p>
                </div>
            </div>
        `;
        console.log(weatherInfo);
    } catch (err) {
        console.log(err);
        displayData.innerHTML = `<p>Error fetching weather data</p>`;
    }
}

const convertTempF = (input) => {
    input = input 
}

const pullData = (data) => {
    const { temperature, humidity, dewPoint, visibility, windSpeed, windDirection, precipitationProbability } = data.data.values;
    const locationName = data.location.name;
    const temperatureF = (temperature * 9/5) + 32;
    const dewPointF = (dewPoint * 9/5) + 32;
    const visibilityM = visibility * 0.621371;
    const windSpeedMPH = windSpeed * 2.23694;
    const cardinalDirection = degreesToCardinal(windDirection); 

    return {
        locationName,
        temperatureF: temperatureF.toFixed(1),
        humidity: humidity.toFixed(1),
        dewPointF: dewPointF.toFixed(1),
        visibilityM: visibilityM.toFixed(1),
        windSpeedMPH: windSpeedMPH.toFixed(1),
        windDirection: windDirection.toFixed(1),
        cardinalDirection,
        precipitationProbability: precipitationProbability.toFixed(1)
    };
}

const degreesToCardinal = (degrees) => {
    const directions = [
        'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
    ];
    const index = Math.round((degrees % 360) / 45); // 360 degrees / 8 directions
    return directions[index % 8];
}

const nextSearch = () => {
    userInput.style.display = "inline";
    searchBtn.style.display = "inline";
    searchAgainBtn.style.display = "none";
    userInput.value = "";
    displayData.innerHTML = "";
}

searchBtn.addEventListener("click", fetchData);
searchAgainBtn.addEventListener("click", nextSearch);