# weatherGrabNode

## Prompt

Using the OpenWeatherMap API at http://openweathermap.org/current, create a program that prompts for a city name and returns the current temperature for the city. 

Example Output:

Where are you? 

Chicago IL 

Chicago weather:

65 degrees Fahrenheit 

## Setting Up

This is a program written in node.

The github version of this project has it's API keys taken down for security. In order to run this program clone it, add your API keys to the index.js file, and type in node index.js in the appropriate directory. 

## Limitations

Note - This program is limited for US cities only

## Design and Implementation Notes

The example input takes Chicago IL and outputs Chicago weather. An issue I ran into with the OpenWeatherMap API is the fact that the input "Chicago IL" as a city has the API return not
found. I brainstormed a couple ways to get around this. 

1) Split the input into "Chicago" and "IL". And have 2 API calls which means we return the one that gets a valid response. A problem I realized with this approach is that 
for cities like "Los Angeles" this approach would split "Los" and "Angeles", so we would need to have 3 different calls if we wanted to also query "Los Angeles." I though this would be a waste of the API resources,
and probably would not scale well assuming we had hundreds of users using this program, given my API key limits the amount of calls I can make per a minute 

2) Match the input to an actual city locally in the program, if there are multiple hits for a given input we can prompt the user to clarify which of the hits the user would like to find the weather for. This was the approach I ended up going with, because it uses less API resources and scales better with a lot more users. 

## Output

Joels-MacBook-Pro-4:weatherGrabNode jj$ node index.js 

Where are you? Chicago IL

There are multiple matches for Chicago IL

1. Chicago Lawn, Illinois, USA

2. Chicago Loop, Illinois, USA

3. Chicago Heights, Illinois, USA

4. Chicago Ridge, Illinois, USA

5. South Chicago Heights, Illinois, USA

6. Chisago City, Minnesota, USA

7. Chicago, Illinois, USA

8. New Chicago, Indiana, USA

9. West Chicago, Illinois, USA

10. East Chicago, Indiana, USA


Please enter the number of the choice you would like (ie '1') 7

Chicago weather: 

27.75 degrees Fahrenheit



