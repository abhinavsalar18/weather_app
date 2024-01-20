import React from 'react'
import useTheme from "../context/ThemeContext"
import dark_icon from "../staticData/images/dark_mode.svg"
import light_icon from "../staticData/images/light_mode.svg"

export default function ThemeButton() {
    
    const {themeMode, lightTheme, darkTheme} = useTheme()
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }
    return (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={onChangeBtn}
            checked={themeMode === "dark"}
          />
          <div className="relative flex items-center">
            <img
              src={dark_icon}
              alt="dark_icon"
              className={`h-4 w-4 mx-1 my-auto absolute right-0 transition-transform ${
                themeMode === "dark" ? "" : "transform -translate-x-full opacity-0"
              }`}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-cyan-300 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-cyan-200"></div>
            <img
              src={light_icon}
              alt="light_icon"
              className={`h-4 w-4 mx-1 my-auto absolute left-0 transition-transform ${
                themeMode === "dark" ? "transform translate-x-full opacity-0" : ""
              }`}
            />
          </div>
        </label>
      );
      
      
      
         
      
}