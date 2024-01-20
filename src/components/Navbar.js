import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";
import useTheme from "../context/ThemeContext";
import { img_url } from "../constants";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const {themeMode, darkTheme, lightTheme} = useTheme();
    console.log(themeMode);
    const login_logoutHandler = (event) => {
        // console.log("Logout: ", user, event.target.innerHTML);
        if(event.target.innerHTML === "Logout"){
            console.log("User Logged out!")
            setUser(null);
        }
        else{
            navigate("/login");
        }
        
    }

    const themeChanger = () => {
        if(themeMode === 'light'){
            darkTheme();
        }
        else{
            lightTheme();
        }
    }

    useEffect(() => {
    // if(!user){
    //     navigate("/login");
    // }
    }, [user])
    return (
        <>
            <div className="flex justify-between px-4 bg-gradient-to-r from-cyan-500 to-purple-400 py-2 overflow-hidden text-white">
                <div className="flex">
                    <img 
                        // onClick={() => navigate("/")}
                        className="rounded-2xl cursor-pointer"
                        width={30}
                        height={30}
                        src={img_url} 
                        alt="icon"
                    />
                    <span 
                        // onClick={() => navigate("/")}
                        className="px-4 cursor-pointer">Weather App
                    </span>
                </div>
                <div className="flex">
                    <ThemeButton />
                    <span 
                        onClick={(event) => login_logoutHandler(event)}
                        className="px-2 cursor-pointer" >
                        {user ? "Logout" : "Login"}
                    </span>
                    
                </div>
                
            </div>
        </>
    );
};

export default Navbar;