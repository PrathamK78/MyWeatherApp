//Get all the necessary elements from the DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dataOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city
let city = 'Faridabad';

//add click event to the search button

cities.forEach(city => {
    city.addEventListener('click', function () {
        //change the city from default to the one clicked
        cityInput = e.target.innerHTML;
        //function to get the weather data
        fetchWeatherData();
        //fade out the app animation
        app.style.animation = 'fadeOut 0.5s';
    })
})

form.addEventListener('submit', function (e) {
    // if the input field is empty throw an alert
    if(search.value.length==0){
        alert('Please enter a city name');
    }
    else{
        //change the city from default to the one entered
        cityInput = search.value;
        //function to get the weather data
        fetchWeatherData();
        //remove all the text from the input field
        search.value = '';
        //fade out the app animation
        app.style.animation = 'fadeOut 0.5s';
    }
    //prevent the default action of the form
    e.preventDefault();
});

//function that returns a day of the week

function getDayOfWeek(day,month,year) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[new Date(`${day},${month},${year}`).getDay()];
};

//function to get the weather data from the weather API
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=ecc1a6738db54d36b31132911242402=${cityInput}`)

    //take the response and convert it to JSON
    .then(response => response.json())
    .then(data =>{
        console.log(data);

        temp.innerHTML = data.current.temp_c + '°C';
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const year = parseInt(date.substr(0,4));
        const month = parseInt(date.substr(5,2));
        const day = parseInt(date.substr(8,2));
        const time = date.substr(11);

        dataOutput.innerHTML = `${dayOfTheWeek(day,month,year)}${day},${month} {year}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.location.name;

        //get the corresponding weather icon
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);

        //reformat the icon url to your own local folder path and set it as the source of the image
        icon.src = "./icons/" + iconId;

        cloudOutput.innerHTML = data.current.cloud + '%';
        humidityOutput.innerHTML = data.current.humidity + '%';
        windOutput.innerHTML = data.current.wind_kph + 'kph';

        //set default time
        let timeOfDay = 'day';
        //get the unique id for each weather condition
        const code = data.current.condition.code;
        
        //change to night
        if(!data.current.is_day){
            timeOfDay = 'night';
        }
        if(code==1000){
            app.style.backgroundImage = `url('./images/${timeOfDay}/clear.jpg')`;

            btn.style.background = "#e5ba92";
            if(timeOfDay=='night'){
                btn.style.background = "#181e27";
            }
        }
        else if(
            code==1003 ||
            code==1006 ||
            code==1009 ||
            code==1030 ||
            code==1069 ||
            code==1087 ||
            code==1135 ||
            code==1273 ||
            code==1276 ||
            code==1279 ||
            code==1282 
        ){
            app.style.backgroundImage = `url('./images/${timeOfDay}/cloudy.jpg')`;
            btn.style.background = "#fa6d1b";
            if(timeOfDay=='night'){
                btn.style.background = "#181e27";
            }
            else if(
                code==1063 ||
                code==1180 ||
                code==1183 ||
                code==1186 ||
                code==1189 ||
                code==1192 ||
                code==1195 ||
                code==1198 ||
                code==1201 ||
                code==1240 ||
                code==1243 ||
                code==1246 ||
                code==1249 ||
                code==1252 ||
                code==1255 ||
                code==1258 ||
                code==1261 ||
                code==1264 ||
                code==1279 ||
                code==1282
            ){
                app.style.backgroundImage = `url('./images/${timeOfDay}/rainy.jpg')`;
                btn.style.background = "#0d3f67";
                if(timeOfDay=='night'){
                    btn.style.background = "#181e27";
                }
            }else{
                app.style.backgroundImage = `url('./images/${timeOfDay}/snowy.jpg')`;
                btn.style.background = "#4d72aa";
                if(timeOfDay=='night'){
                    btn.style.background = "#1b1b1b";
                }
            }
            app.style.opacity = "1";
        }
})
.catch(() =>{ alert('City not found')
    app.style.opacity = "1";
});
}

fetchWeatherData();


app.style.animation = 'fadeIn 0.5s';