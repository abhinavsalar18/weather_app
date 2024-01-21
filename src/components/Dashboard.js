import { useEffect, useRef, useState } from "react";
import useUser from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import wind from "../staticData/images/air.svg"
import humidity from "../staticData/images/humidity.svg"
import pressure from "../staticData/images/pressure.svg"
import temp_low from "../staticData/images/thermometer_loss.svg"
import temp_high from "../staticData/images/thermometer_add.svg"
import { API_OPTIONS, WEATHER_ICON_BASE_URL, WEATHER_ICON_SUFFIX, current_dummy, forecast_dummy, hourly_dummy, week_days, week_days_full } from "../constants";
import { CiLocationOn } from "react-icons/ci";
import ForecastWeatherCard from "./ForecastWeatherCard";

const Dashboard = () => {
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastWeather, setForecastWeather] = useState();
    const [hourlyWeather, setHourlyWeather] = useState();

    const navigate = useNavigate();
    const {user} = useUser();
    const input = useRef();
    const date = new Date().toString().split(' ').splice(0,4);
    let day_index = week_days.indexOf(date[0]);
    const time = new Date().toLocaleString(
        'en-US', 
        { 
            hour: 'numeric', minute: 'numeric', hour12: true 
        }
    );
   

    // function for mapping location to the latitude and longitude using Geocoding API
    const geocodingData = async (location) => {
        const {geocoding_base, key} = API_OPTIONS;
        const latitude_longitude_data = await fetch(`${geocoding_base}?q=${location}&appid=${key}`);

        const jsonData = await latitude_longitude_data.json();        
        const {lat, lon} = jsonData[0];
        return {lat, lon};
    }


    // fetching all the weather data
    const fetchData = async (default_loc) => {
         
        try {
            const query_location = input?.current?.value || default_loc;

            const {weather_base, key} = API_OPTIONS
            const {lat, lon} = await geocodingData(query_location);

            const weatherData = await fetch(`${weather_base}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
            const weatherDataJson = await weatherData.json();
            
            // console.log("weather_data: ", weatherDataJson)
            setCurrentWeather(weatherDataJson?.current);
            setForecastWeather(weatherDataJson?.daily);
            setHourlyWeather(weatherDataJson?.hourly);
            setLocation(query_location);
            input.current.value = "";
           

        } catch (error) {
            console.log(error);
        }
        

    }
    

    // utility functions for converting time and manipulation of string

    // UINX UTC time to standard 24 hours time
    const UnixUTC_to_time24 = (crnt_time) => {
        const unix_timestamp = crnt_time;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime.toString();
        
    }
    
    // making first letter of each word capital
    function toCamelCase(inputString) {
        if(!inputString) return "";
        return inputString.replace(/\w+/g, function(word, index) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
      }

      // converting 24 hours time to 24 hours
    const getTimeIn12Hours = (time_24) => {
        const [hours, minutes] = time_24.split(':');
        let hours12 = parseInt(hours, 10);

        const period = hours12 >= 12 ? 'PM' : 'AM';

        hours12 = hours12 % 12 || 12;
        
        const time12 = `${hours12}:${minutes} ${period}`;

        return time12;
    }

    // if user if not logged in then redirect to login page
    useEffect(() => {
        fetchData("Delhi");
        if(!user){
            navigate("/");
        }
    }, []);


    return (
        <div className="overflow-hidden dark:bg-[rgb(61,61,61)] min-h-[100vh]">
            <div className="input py-2 text-center ">
            <input
                ref={input}
                placeholder="Enter your city"
                className="border-2 m-4 rounded-xl p-[5px] px-4 mx-auto w-56 border-cyan-300 dark:bg-[rgb(51,51,51)] focus:border-cyan-500 outline-none dark:text-white"
            />

                <button 
                    className="py-[5px] px-2 mx-4 border-2 rounded-xl hover:rounded-2xl transition-all duration-300 border-cyan-500 bg-gradient-to-r from-cyan-400 to-blue-400 text-white"
                    onClick={() => fetchData()}
                >
                    Search
                </button>
            </div>
            <div className="weather-card border-cyan-300  flex  border md:rounded-xl lg:rounded-2xl rounded-3xl w-[80%] lg:w-[55%] mx-auto justify-center dark:bg-[rgb(51,51,51)] dark:text-white">
                <div className="date-time-loc  w-full flex-col justify-between py-4">
                    <div className=" flex justify-between px-4">
                        <div className="flex items-center">
                            <div className="pr-[5px]">
                                <CiLocationOn 
                                />
                            </div>
                            <span>{location || "--"}</span>
                        </div>
                        <span>{date && date.join(' ')}</span>
                        <span>{time}</span>
                    </div>
                    <div className="temp-icon flex justify-center text-center py-4">
                        <h1 className="lg:text-9xl md:text-8xl text-7xl">{currentWeather?.temp || "--"}° </h1>
                        {
                            currentWeather &&
                            <img 
                                className="w-20"
                                // ${(currentWeather?.weather[0]?.icon).substr(0,2)}${themeMode==='light' ? 'd' : 'n'}
                                src={`${WEATHER_ICON_BASE_URL}${currentWeather?.weather[0]?.icon}${WEATHER_ICON_SUFFIX}`} alt="logo"
                            />
                        }
                    </div>
                    <div className="text-feeslike flex justify-center">
                        <div className="flex-col text-center">
                            <h2 className="text-2xl text-gray-600 dark:text-gray-400 font-semibold">{toCamelCase(currentWeather?.weather[0]?.description)}</h2>
                            {
                                <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400">{currentWeather && "Feels like "}&nbsp;{currentWeather?.feelslike_c}°</h2>
                            }
                        </div>
                        <div className="flex px-4 -mt-4">
                            <div className="flex items-center px-2">
                                <img src={temp_low} alt="temp_high" />
                                <span className="text-lg font-semibold px-[4px]">{forecastWeather && forecastWeather[0]?.temp?.min}°</span>
                            </div>
                            <div className="flex items-center px-2">
                                <img src={temp_high} alt="temp_high" />
                                <span className="text-lg font-semibold px-[4px]">{forecastWeather && forecastWeather[0]?.temp?.max}°</span>
                            </div>
                        </div>
                    </div>
                    <div className="info border-cyan-300 shadow-lg flex self-center justify-between rounded-lg border my-4 md:w-[70%] w-[85%] lg:w-[60%] px-4 mx-auto dark:bg-[rgb(51,51,51)] dark:text-white">
                            <div className="flex-col justify-center text-center py-2">
                                <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={pressure} alt="pressure"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.pressure || "--"} hPa</h2>
                                <h2 className="font-medium">Pressure</h2>
                            </div>
                            <div className="flex-col justify-center text-center py-2">
                            <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={humidity} alt="humidity"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.humidity || "--"}%</h2>
                                <h2 className="font-medium">Humidity</h2>
                            </div>
                            <div className="wind flex-col justify-center text-center py-2">
                            <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={wind} alt="pressure"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.wind_speed || "--"} m/s</h2>
                                <h2 className="font-medium">Wind</h2>
                            </div>
                    </div>
                    <div className="hourly-forecast my-4 text-center">
                        <h1 className="py-2 text-lg">{currentWeather && "Hourly Forecast"}</h1>
                        <div className="flex overflow-x-auto no-scrollbar box-border lg:mx-8 md:mx-4 mx-2">
                            {
                                hourlyWeather &&
                                hourlyWeather?.map((data, index) => {
                                    const time_24 = UnixUTC_to_time24(data?.dt);
                                    const time_12 = getTimeIn12Hours(time_24);
                                    return (
                                        <div key={index} className="min-w-20 mx-2">
                                            <WeatherCard 
                                                key={index} day={time_12} temp={data?.temp} 
                                                icon={`${WEATHER_ICON_BASE_URL}${data.weather[0]?.icon}${WEATHER_ICON_SUFFIX}`} 
                                            />
                                        </div>
                                    );
                                })  
                            }
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center mt-8 font-semibold text-gray-600 dark:text-gray-300 text-lg">{currentWeather && "Forecast For UpComing Days"}</h1>
            <div className="forecast my-8 lg:w-[80%] md:w-[100%] w-[95%] mx-auto flex-col justify-center">
                {
                    forecastWeather &&
                    forecastWeather.map((data, index) => {
                        const crnt_day = week_days_full[(parseInt(day_index + index) % week_days.length)];
                        const icon = `${WEATHER_ICON_BASE_URL}${data.weather[0]?.icon}${WEATHER_ICON_SUFFIX}`;
                        const {min, max} = data?.temp;
                        const description = toCamelCase(data.weather[0].description);
                        return index !== 0 && (
                            <>
                                <ForecastWeatherCard 
                                    key={index} 
                                    day={crnt_day} 
                                    icon={icon} 
                                    temp_low={min} 
                                    temp_high={max} 
                                    title={description}
                                />
                            </>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Dashboard;