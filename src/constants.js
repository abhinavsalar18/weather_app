export const authData = [
    {
      "name": "John Doe",
      "username": "john_doe",
      "password": "password123",
      "city": "New York"
    },
    {
      "name": "Jane Smith",
      "username": "jane_smith",
      "password": "pass456",
      "city": "Los Angeles"
    },
    {
      "name": "Alice Johnson",
      "username": "alice_j",
      "password": "secure789",
      "city": "Chicago"
    },
    {
      "name": "Bob Thompson",
      "username": "bob_t",
      "password": "bobpass",
      "city": "San Francisco"
    }
  ];


  export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  export const week_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  export const week_days_full = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  


  // API related data

  // weatherapi.com
  // export const API_KEY = process.env.REACT_APP_API_KEY;
  // export const API_BASE_URL = "https://api.weatherapi.com/v1";
  
  // open weather map API
  export const API_KEY = process.env.REACT_APP_API_KEY;
  // geocoding example url => http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  export const OPEN_GEOCODING_API_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct"

  // weather app example url => https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}
  export const OPEN_API_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";
  
  export const WEATHER_ICON_BASE_URL = "https://openweathermap.org/img/wn/"
  export const WEATHER_ICON_SUFFIX = "@2x.png";

  export const API_OPTIONS = {
    key: API_KEY,
    weather_base: OPEN_API_BASE_URL,
    geocoding_base: OPEN_GEOCODING_API_BASE_URL,
}
