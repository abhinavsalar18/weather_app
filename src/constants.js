export const img_url = "https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png";

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
  
  export const API_KEY = process.env.REACT_APP_API_KEY;
  export const API_BASE_URL = "https://api.weatherapi.com/v1";
  export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  export const week_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  export const week_days_full = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  export const API_OPTIONS = {
    key: API_KEY,
    base: API_BASE_URL,
    forecast: "/forecast.json",
    current_weather: "/current.json"
}