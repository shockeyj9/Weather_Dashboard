//Define global variables here
var searchForm = document.querySelector('#search-button');
var historicOption = document.querySelector('.history');
var cityInput = document.querySelector('#city-name');
var forecastContainer = document.querySelector('.forcast');

var storedCities = [];
const APIkey = '';


//--------SEARCH BUTTON KICK OFF ------------//
var searchedEventHandler = function(event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    if (citySearched){
        localStorage.setItem("storedCities",JSON.stringify(storedCities));
        getCityCoordinates(citySearched);
    } 
}

/*function: selectedEventHandler {
    take the event.target's textContent and assign to variable citySelected

    if citySelected is not null then it should trigger the getWeather function
}*/

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
                // console.log(data[i].lat,data[i].lon);
                // getWeather(data[i].lat,data[i].lon)
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
            var weatherList = data.list;
        for (var i=0; i<weatherList.length;i++){
            console.log(weatherList[i].dt_txt);
    //right now this pulls the forcast information in 3 hour incredments, we'll need to narrow it down to a single hour and render those results to the page
            //renderCurrent(weatherList[i].dt_txt,weatherList[i].TEMP,weatherList[i].WIND,weatherList[i].HUMIDITY)
        }
        })
        .catch(error => console.log('error', error));
}

//-------------GETTING CURRENT WEATHER----------//
var currentWeather = function (lat,lon){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+APIkey, requestOptions)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        })
        .catch(error => console.log('error', error));

}

//-----------RENDER FORECAST WEATHER------------------//
var renderCurrent = function(date, temp, wind,humidity){
    var cardHeader = document.createElement('h3');
    var forecastCard = document.createElement('ul');
    var cardTemp = document.createElement('li');
    var cardWind = document.createElement('li');
    var cardHumid = document.createElement('li');
    forecastCard.setAttribute('class', 'forecast-card');
    forecastContainer.append(cardHeader);
    forecastContainer.append(forecastCard);
    forecastCard.append(cardTemp);
    forecastCard.append(cardWind);
    forecastCard.append(cardHumid);
    cardHeader.textContent = date;
    cardTemp.textContent = temp;
    cardWind.textContent = wind;
    cardHumid.textContent = humidity;
    //IMAGE FOR WEATHER NEEDS DONE
}


//-----------RENDERING PREVIOUS SEARCHES ONTO PAGE-------------//
var renderCities = function(){
    storedCities = JSON.parse(localStorage.getItem('storedCities'));
    storedCities.forEach(element => {
        var cityItem = document.createElement("li");
        historicOption.append(cityItem); 
        cityItem.textContent = element;
    });
}


renderCities();
searchForm.addEventListener('click', searchedEventHandler);
//historicOption.eventlistener -- function: selectedEventHandler