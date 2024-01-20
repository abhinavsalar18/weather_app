import React from 'react'
import temp_low_icon from "../staticData/images/thermometer_loss.svg"
import temp_high_icon from "../staticData/images/thermometer_add.svg"

const ForecastWeatherCard = (props) => {
  const {day, temp_high, temp_low, icon, title} = props;
    return (
    <>
        <div className='flex  my-2 border justify-between p-2 rounded-2xl px-4 lg:w-[70%] md:w-[80%] w-[85%] mx-auto text-center items-center border-cyan-400 shadow-lg dark:bg-[rgb(51,51,51)] dark:text-white'>
            <div className='w-20'>{day}</div>
            <div className='flex justify-center items-center align-middle w-10'>
                <img 
                    width={40}
                    className=''
                    src={icon} alt='icon'
                />
            </div>
            <div className='w-24'>{title}</div>
            <div className='flex justify-center w-12'>
                <img 
                    className='px-[2px]'
                    src={temp_low_icon} alt="temp_low" 
                />
                {temp_low}
            </div>
            <div className='flex w-12'>
                <img 
                    className='px-[2px]'
                    src={temp_high_icon} alt="temp_high" 
                />
                {temp_high}
            </div>
        </div>
    </>
  )
}

export default ForecastWeatherCard;
