import { createContext, useContext, useState } from "react";

const theme = localStorage.theme || 'light';
const ThemeContext = createContext(
    {
        themeMode: `${theme}`,
        darkTheme: () => {},
        lightTheme: () => {}
    }
);

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext);
};

// localStorage.setItem("theme", {})
