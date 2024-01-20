import { useEffect, useRef, useState } from "react";
import useUser from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import wind from "../staticData/images/air.svg"
import humidity from "../staticData/images/humidity.svg"
import pressure from "../staticData/images/pressure.svg"
import temp_low from "../staticData/images/thermometer_loss.svg"
import temp_high from "../staticData/images/thermometer_add.svg"
import { week_days, week_days_full } from "../constants";
import { CiLocationOn } from "react-icons/ci";
import ForecastWeatherCard from "./ForecastWeatherCard";
const Dashboard = () => {
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState();
    const [forecastWeather, setForecastWeather] = useState();

    const navigate = useNavigate();
    const {user} = useUser();
    const input = useRef();
    const date = new Date().toString().split(' ').splice(0,4);
    let crnt_time = new Date().toLocaleTimeString().toString().split(":").splice(0,2);
    let time_minutes = parseInt(crnt_time[0]) * 60 + parseInt(crnt_time[1]);
    
    let day_index = week_days.indexOf(date[0]);
    // console.log(crnt_time);
    const time = new Date().toLocaleString(
        'en-US', 
        { 
            hour: 'numeric', minute: 'numeric', hour12: true 
        }
    );
    // console.log(time, date)
    const fetchData = async () => {
        try {
            const api = {
                key: "1117b4c403c24488ad160732241901",
                base: "https://api.weatherapi.com/v1",
                forecast: "/forecast.json",
                current_weather: "/current.json"

            }
            const days = "7";
            // const query_lat_lon = `${location.latitude},${location.longitude}`;
            const query_location = input?.current?.value || "Delhi";
            // setLocation(query_location);
            // const query = query_location ? query_location : query_lat_lon;
            // const currentWeather = await fetch(`${api.base}${api.current_weather}?q=${query_location}&key=${api.key}`);
            const forecastWeather = await fetch(`${api.base}${api.forecast}?q=${query_location}&key=${api.key}&days=${days}`);
            // const currentWeatherJson = await currentWeather.json();
            const forecastWeatherJson = await forecastWeather.json();
            console.log(forecastWeatherJson?.current, forecastWeatherJson?.forecast?.forecastday);

            setCurrentWeather(forecastWeatherJson?.current);
            setForecastWeather(forecastWeatherJson?.forecast?.forecastday);
            setLocation(query_location);
        } catch (error) {
            console.log(error);
        }
        

    }

    const fetchLocation =  () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {coords} = position;
            console.log("User location: ", position, coords);
            setLocation({latitude: coords?.latitude, longitude: coords?.longitude});
            fetchData();
        }, (error) => {
            console.log(error);
        });
    }

    const getTimeIn12Hours = (time_24) => {
       const time_12 = time_24[0] <= '12' ? time_24[0] : (parseInt(time_24[0]) - 12) + ":" + time_24[1] + (parseInt(time_24[0]) >= 12 ? " PM" : " AM");
      return time_12 
    }
    useEffect(() => {
        fetchData();
        // if(!user){
        //     navigate("/login");
        // }
    }, [])
    return (
        <div className="overflow-hidden dark:bg-[rgb(61,61,61)]">
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
                            <CiLocationOn />
                            <span>{location || "--"}</span>
                        </div>
                        <span>{date && date.join(' ')}</span>
                        <span>{time}</span>
                    </div>
                    <div className="temp-icon flex justify-center text-center py-4">
                        <h1 className="lg:text-9xl md:text-8xl text-7xl">{currentWeather?.temp_c || "--"}° </h1>
                        <img 
                            className="w-20"
                            src={currentWeather?.condition?.icon} alt="logo"
                        />
                    </div>
                    <div className="text-feeslike flex justify-center">
                        <div className="flex-col text-center">
                            <h2 className="text-2xl text-gray-600 dark:text-gray-400 font-semibold">{currentWeather?.condition?.text}</h2>
                            {
                                <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400">Feels like &nbsp;{currentWeather?.feelslike_c}°</h2>
                            }
                        </div>
                        <div className="flex px-4 -mt-4">
                            <div className="flex items-center px-2">
                                <img src={temp_low} alt="temp_high" />
                                <span className="text-lg font-semibold px-[4px]">{forecastWeather && forecastWeather[0]?.day.mintemp_c}°</span>
                            </div>
                            <div className="flex items-center px-2">
                                <img src={temp_high} alt="temp_high" />
                                <span className="text-lg font-semibold px-[4px]">{forecastWeather && forecastWeather[0]?.day.maxtemp_c}°</span>
                            </div>
                        </div>
                    </div>
                    <div className="info border-cyan-300 shadow-lg flex self-center justify-between rounded-lg border my-4 md:w-[70%] w-[85%] lg:w-[60%] px-4 mx-auto dark:bg-[rgb(51,51,51)] dark:text-white">
                            <div className="flex-col justify-center text-center py-2">
                                <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={pressure} alt="pressure"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.pressure_mb || "--"} mb</h2>
                                <h2 className="font-medium">Pressure</h2>
                            </div>
                            <div className="flex-col justify-center text-center py-2">
                            <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={humidity} alt="humidity"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.humidity || "--"}%</h2>
                                <h2 className="font-medium">Humidity</h2>
                            </div>
                            <div className="wind flex-col justify-center text-center py-2">
                            <img className="ml-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl p-[2px]" src={wind} alt="pressure"></img>
                                <h2 className="font-semibold pt-[5px]">{currentWeather?.gust_mph || "--"} mph</h2>
                                <h2 className="font-medium">Wind</h2>
                            </div>
                    </div>
                    <div className="hourly-forecast my-4 text-center">
                        <h1 className="py-2 text-lg">Hourly Forecast</h1>
                        <div className="flex overflow-x-auto no-scrollbar box-border mx-2 md:justify-center lg:justify-center">
                            {
                                forecastWeather &&
                                forecastWeather[0]?.hour?.map((data, index) => {
                                    const time_24 = data?.time.split(' ')[1].split(':');
                                    const crnt_time_min = parseInt(time_24[0]) * 60 + parseInt(time_24[1]);
                                    const time_12 = getTimeIn12Hours(time_24);
                                    return time_minutes < crnt_time_min && (
                                        <div key={index} className="min-w-20 mx-2">
                                            <WeatherCard day={time_12} temp={data?.temp_c} icon={data?.condition?.icon} />
                                        </div>
                                    );
                                })  
                            }
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center mt-8 font-semibold text-gray-600 text-lg">Forecast For UpComing Days</h1>
            <div className="forecast my-8 lg:w-[80%] md:w-[100%] w-[95%] mx-auto flex-col justify-center">
                {
                    forecastWeather &&
                    forecastWeather.map((data, index) => {
                        const crnt_day = week_days_full[(parseInt(day_index + index) % week_days.length)];
                        const {icon, text} = data?.day?.condition;
                        const {mintemp_c, maxtemp_c} = data?.day;
                        return index !== 0 && (
                            <>
                                <ForecastWeatherCard 
                                    key={index} 
                                    day={crnt_day} 
                                    icon={icon} 
                                    temp_low={mintemp_c} 
                                    temp_high={maxtemp_c} 
                                    title={text}
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