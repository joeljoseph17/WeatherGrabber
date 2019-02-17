var readline = require('readline-sync');
var apiKey = ''; // ENTER YOUR API KEY HERE inside the quotes

let request = require('request');
const CitySuggest = require('city-suggest');
 
 //limiting the weather query to US cities only
const opts = {
  countryCodes: ['us'],
};
 
//prompt the user
var cityname = readline.question("Where are you? ");
var citynameOriginal = cityname; 

//matching the input to an actual city
const citysuggest = new CitySuggest(opts);
var citynameSuggested = citysuggest.suggest(cityname);

//if there are multiple cities matching the query, we clarify with the user
if (citynameSuggested.length > 1){
  console.log("There are multiple matches for " + cityname)
 
  //print all the hits
  for (var i=0; i< cityname.length; i++){
    //checking to make sure these are valid suggestions
    if (typeof citynameSuggested[i] !== 'undefined' && citynameSuggested[i].displayName !== 'undefined' ){ 
      console.log(i+1 + '. ' + citynameSuggested[i].displayName);
    }   
  }
  console.log("");
  //get user input on desired choice
  var citychoice = readline.question("Please enter the number of the choice you would like (ie '1') ");

  if (citychoice > cityname.length  || citychoice <= 0){ //checking input for invalid choices
    console.log("Sorry that is not a valid input - Please try the program again")
    //exit program if there is a invalid input
    process.exit(1); 
  }
  //finalizing the city name sent to the API
  cityname = citynameSuggested[citychoice-1].displayName;
}
else {
  //if there is only one hit - or no hits just run the original input
  cityname = citynameOriginal;
}

//forming the request
let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  
  if (Object.is('', cityname)){ //check to make sure there is a city name
    console.log("Please enter a city to see the weather");
  }
  else if(err){ //check for general error
    console.log('error:', error);
  }
  else if (Object.is(body, `{"cod":"404","message":"city not found"}`)){ //check for city not found error
    console.log("I'm sorry " + cityname + " is not a city supported by the open weather API");
  }
  else { //other wise print information about the city out

    let weather = JSON.parse(body)
    let message1 = `${weather.name} weather: `;
    let message2 = `${weather.main.temp} degrees Fahrenheit`;

    console.log(message1);
    console.log(message2);
  }

});