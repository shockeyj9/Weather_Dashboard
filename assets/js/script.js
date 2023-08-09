//Global variables here
var searchForm = document.querySelector('#search-button');
var historicOption = document.querySelector('.history');
var cityInput = document.querySelector('#city-name');
var forecastContainer = document.querySelector('.forcast');
var CurrentContainer = document.querySelector('.current');
var storedCities = [];
var timeArray = [];

///DO NOT ADD/COMMIT WITH THIS SET!! 
const APIkey = '';


//--------KEEPS HISTORICAL CITIES POPULATED WHEN REFRESHING------------//
function init(){
    var stCities = JSON.parse(localStorage.getItem('storedCities'));
    if (stCities!==null){
        storedCities= stCities;
    }
    renderCities();
}

//-------------------STORING CITIES------------------//
function storeCities(){
    localStorage.setItem("storedCities",JSON.stringify(storedCities));
}

//--------SEARCH BUTTON KICK OFF ------------//
var searchedEventHandler = function(event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
        if (citySearched === ""||storedCities.includes(citySearched)){
            return;
        }
    storedCities.push(citySearched);
    cityInput.value = '';
    storeCities();
    renderCities();
    getCityCoordinates(citySearched);

}
//-----------RENDERING PREVIOUS SEARCHES ONTO PAGE-------------//
var renderCities = function(){
    historicOption.innerHTML = "";
    for (var i =0; i<storedCities.length;i++){
        var city = storedCities[i];
        var li = document.createElement("li");
        li.textContent = city;
        historicOption.appendChild(li);
    }
}
 
//---------HISTORY BUTTON KICK OFF-------------//
var historyEventHandler = function(event){
    var citySelected = event.target
    forecastContainer.innerHTML='';
    getCityCoordinates(citySelected.textContent);
}

//--------------GET SEARCHED CITY'S COORDINATES-----------//
var getCityCoordinates = function (citySearched){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+citySearched+",Colorado,US&limit=1&appid="+APIkey, requestOptions)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for (var i = 0; i<data.length;i++){
            getWeather(data[i].lat,data[i].lon)
            currentWeather(data[i].lat,data[i].lon);
        }
    })
    .catch(error => console.log('error', error));
}

//------------------GETTING FORCAST DATA--------------//
var getWeather = function(lat,lon){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIkey+"&units=imperial", requestOptions)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var data = data.list;

    for (var i=0; i<data.length;i++){
        var time = new Date().getHours();  
        var closestTime = data[i].dt_txt;
        var currentData = data[i]
        closestTime = closestTime.split(" ")[1].split(":")[0];
        var diff = time-closestTime
        diff = Math.abs(diff);        
        timeArray.push({diff,currentData});  
    }
    getClosestTime();
    })
    .catch(error => console.log('error', error));
}

//---FINDS FORECAST INFO CLOSEST TO CURRENT HOUR TO DISPLAY---//
var getClosestTime = function(){
    var min = Math.min(...timeArray.map(element=> element.diff));
    for (var i=0; i<timeArray.length; i++){
        if (timeArray[i].diff===min) {
            getWeatherParameters(timeArray[i].currentData);
        }
    }

}


//-----------gets variables needed for rendering
function getWeatherParameters (data){
    var date = data.dt*1000;;
    var temp1 = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var icon = data.weather[0].icon;
    renderForecast(date, temp1, wind,humidity,icon);
}
function getCurParameters (data){
    var name = data.name;
    var date = data.dt*1000;
    var temp1 = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var icon = data.weather[0].icon;
    renderCurrent(date, temp1, wind,humidity,name,icon);
}


//-------------GETTING CURRENT WEATHER----------//
var currentWeather = function (lat,lon){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey+"&units=imperial", requestOptions)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        getCurParameters(data)
    })
    .catch(error => console.log('error', error));
}

//-----------RENDER CURRENT WEATHER------------------//
var renderCurrent = function(date, temp, wind,humidity,name,icon){
    var cardHeader = document.createElement('h2');
    var currentCard = document.createElement('ul');
    var cardName = document.createElement('li');
    var cardTemp = document.createElement('li');
    var cardWind = document.createElement('li');
    var cardHumid = document.createElement('li');
    var cardIcon = document.createElement('img');
    cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+icon+'@2x.png');
    cardIcon.setAttribute('alt', 'weather-icon');
    var fullDate = new Date(date); 
    CurrentContainer.innerHTML = '';
    CurrentContainer.append(cardHeader);
    CurrentContainer.append(cardIcon);
    CurrentContainer.append(currentCard);
    currentCard.append(cardName);
    currentCard.append(cardTemp);
    currentCard.append(cardWind);
    currentCard.append(cardHumid);
    cardHeader.textContent = name +" ("+ fullDate.toLocaleDateString()+")" ;
    cardTemp.textContent = "Temp: "+temp+" °F";
    cardWind.textContent ="Wind: " +wind+" MPH";
    cardHumid.textContent = "Humidity: "+humidity+" %";
}

//-----------RENDER FORECAST WEATHER------------------//
var renderForecast = function(date, temp, wind,humidity,icon){
    var cardHeader = document.createElement('h3');
    var forecastCard = document.createElement('ul');
    var cardTemp = document.createElement('li');
    var cardWind = document.createElement('li');
    var cardHumid = document.createElement('li');
    var cardIcon = document.createElement('img');
    var fullDate = new Date(date); 
    forecastCard.setAttribute('class', 'forecast-card');
    cardIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+icon+'@2x.png');
    cardIcon.setAttribute('alt', 'weather-icon');
    forecastContainer.append(forecastCard);
    forecastCard.append(cardHeader);
    forecastCard.append(cardIcon);
    forecastCard.append(cardTemp);
    forecastCard.append(cardWind);
    forecastCard.append(cardHumid);
    cardHeader.textContent = fullDate.toLocaleDateString();
    cardTemp.textContent = "Temp: "+temp+" °F";
    cardWind.textContent = "Wind: " +wind+" MPH";
    cardHumid.textContent = "Humidity: "+humidity+" %";
}


init();
searchForm.addEventListener('click', searchedEventHandler);
historicOption.addEventListener('click', historyEventHandler);
