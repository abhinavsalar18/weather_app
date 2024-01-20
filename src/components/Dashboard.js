import { useEffect, useRef, useState } from "react";
import useUser from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import wind from "../staticData/images/air.svg"
import humidity from "../staticData/images/humidity.svg"
import pressure from "../staticData/images/pressure.svg"
import temp_low from "../staticData/images/thermometer_loss.svg"
import temp_high from "../staticData/images/thermometer_add.svg"
import { API_BASE_URL, API_KEY, API_OPTIONS, week_days, week_days_full } from "../constants";
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
    
    let crnt_time = new Date().toLocaleTimeString().toString().split(":").splice(0,2);
    let time_minutes = parseInt(crnt_time[0]) * 60 + parseInt(crnt_time[1]);
    
    let day_index = week_days.indexOf(date[0]);
    const time = new Date().toLocaleString(
        'en-US', 
        { 
            hour: 'numeric', minute: 'numeric', hour12: true 
        }
    );
   
    const fetchData = async () => {
        if(!input || !input.current || input.current.value === "") return; 

        try {
            const api = API_OPTIONS;
            const days = "7";
            const query_location = input?.current?.value;
            input.current.value = "";

            const forecastWeather = await fetch(`${api.base}${api.forecast}?q=${query_location}&key=${api.key}&days=${days}`);
            const forecastWeatherJson = await forecastWeather.json();

            setCurrentWeather(forecastWeatherJson?.current);
            setForecastWeather(forecastWeatherJson?.forecast?.forecastday);
            
            setHourlyForecast(forecastWeatherJson?.forecast?.forecastday);
            setLocation(query_location);
           

        } catch (error) {
            console.log(error);
        }
        

    }
    
    function setHourlyForecast(forecastData){
        let data_same_day = forecastData[0]?.hour.filter((data) => {

            const time_24 = data?.time.split(' ')[1].split(':');
            const crnt_time_min = parseInt(time_24[0]) * 60 + parseInt(time_24[1]); 
            if(crnt_time_min > time_minutes) return true;
            return false;
        });
        
        let count  = data_same_day.length;
        let data_next_day = forecastData[1]?.hour.filter(() => {
            if(count < 24){
                count++;
                return true;
            }
            return false;
        });
        
        setHourlyWeather([...data_same_day, ...data_next_day]);
    }
    

    const getTimeIn12Hours = (time_24) => {
        const hrs = parseInt(time_24[0]) <= 12 ? parseInt(time_24[0]) : (parseInt(time_24[0]) - 12);
        const minutes = time_24[1];
        let time_12 = (hrs === 0 ? "12" : (hrs < 10 ? ("0" + hrs) : hrs));
        time_12 += ":" + minutes + (hrs < 12 ? " AM" : " PM");
        return time_12 ;
    }

    // if user if not logged in then redirect to login page
    useEffect(() => {
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
                        <h1 className="lg:text-9xl md:text-8xl text-7xl">{currentWeather?.temp_c || "--"}° </h1>
                        {
                            currentWeather &&
                            <img 
                                className="w-20"
                                src={currentWeather?.condition?.icon} alt="logo"
                            />
                        }
                    </div>
                    <div className="text-feeslike flex justify-center">
                        <div className="flex-col text-center">
                            <h2 className="text-2xl text-gray-600 dark:text-gray-400 font-semibold">{currentWeather?.condition?.text}</h2>
                            {
                                <h2 className="text-md font-semibold text-gray-600 dark:text-gray-400">{currentWeather && "Feels like "}&nbsp;{currentWeather?.feelslike_c}°</h2>
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
                        <h1 className="py-2 text-lg">{currentWeather && "Hourly Forecast"}</h1>
                        <div className="flex overflow-x-auto no-scrollbar box-border lg:mx-8 md:mx-4 mx-2">
                            {
                                hourlyWeather &&
                                hourlyWeather?.map((data, index) => {
                                    const time_24 = data?.time.split(' ')[1].split(':');
                                    const time_12 = getTimeIn12Hours(time_24);
                                    return (
                                        <div key={index} className="min-w-20 mx-2">
                                            <WeatherCard key={index} day={time_12} temp={data?.temp_c} icon={data?.condition?.icon} />
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