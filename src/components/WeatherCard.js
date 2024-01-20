import React from 'react'

 const WeatherCard = (props) => {
 const {day, temp, icon} = props;
  return (
    <div className="shadow-lg w-20 h-28 border-2 border-cyan-300 rounded-lg text-center py-2 flex flex-col  dark:bg-[rgb(51,51,51)] dark:text-white">
        <p className='text-sm font-semibold'>{day}</p> 
        <div className='flex justify-center'>
          <img width={50} src={icon} alt="icon" />
        </div>
        <h1 className="font-medium">{temp}°</h1>
    </div>
  )
}

export default WeatherCard;
