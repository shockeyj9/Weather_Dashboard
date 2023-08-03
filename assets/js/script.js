//Define global variables here
var searchForm = document.querySelector('#search-button');
var historicOption = document.querySelector('.history');
var cityInput = document.querySelector('#city-name');

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
                getWeather(data[i].lat,data[i].lon)
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
        }
        })
        .catch(error => console.log('error', error));
}

/* function: currentWeather(city stuff) {
    take elements from API and createElements
}*/

/* function: forecastWeather(city stuff) {
    take elements from API and createElements
}*/

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