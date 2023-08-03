//Define global variables here
var searchForm = document.querySelector('#search-button');
var historicOption = document.querySelector('.history');
var cityInput = document.querySelector('#city-name');

var storedCities = [];


//--------SEARCH BUTTON KICK OFF ------------//
var searchedEventHandler = function(event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    if (citySearched){
        storedCities.push(citySearched);
        localStorage.setItem("storedCities",JSON.stringify(storedCities));
        //GET LON AND LAT FUNCTION HERE
    } 
}

/*function: selectedEventHandler {
    take the event.target's textContent and assign to variable citySelected

    if citySelected is not null then it should trigger the getWeather function
}*/

/*function: getlat&lon {
    take the city name and use that within the fetch
    .then{
        call getWeather(lat&lon);
        call 
    }
} */

/*function: getWeather {
    take in the city and use that within the fetch 

    within the .then -- call function for currentWeather(data.stuff) and forecastWeather(data.stuff)
}*/

/* function: currentWeather(city stuff) {
    take elements from API and createElements
}*/

/* function: forecastWeather(city stuff) {
    take elements from API and createElements
}*/

//-----------RENDERING PREVIOUS SEARCHES ONTO PAGE-------------//
var renderCities = function(){
    console.log("loading");
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