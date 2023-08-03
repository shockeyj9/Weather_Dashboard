//Define global variables here
var searchForm = document.querySelector('#search-button');
var historicOption = document.getElementById('history');
var cityInput = document.querySelector('#city-name');

var storedCities = [];


/*function: searchedEventHandler {
    take the event.target's textContent and assign to variable citySearched
    call saveCities(citySearched) to update local storage with new city name

    if citySearched is not null then it should trigger the getWeather function
}*/
var searchedEventHandler = function(event){
    event.preventDefault();
    var citySearched = cityInput.value.trim();
    if (citySearched){
        storedCities.push(citySearched);
        localStorage.setItem("storedCities",JSON.stringify(storedCities));
        // console.log(citySearched);
    } else{return}
}

/*function: selectedEventHandler {
    take the event.target's textContent and assign to variable citySelected

    if citySelected is not null then it should trigger the getWeather function
}*/

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

/* function: saveCities (citySearched){
    push the citySearched to storedCities
    send the array to local storage
}*/

/* function: getCities (citySearched){
    get data from local storage and insert into citySearched array
    create a list element for each city in array
}*/


// event listener for page load -- need to pull local storage into saveCities array 
// searchForm.addEventListener('click', searchedEventHandler)
searchForm.addEventListener('click', searchedEventHandler);
//historicOption.eventlistener -- function: selectedEventHandler