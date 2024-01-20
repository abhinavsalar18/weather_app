import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";
import { img_url } from "../constants";
import weather_icon from "../staticData/images/weather_icon.png";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const login_logoutHandler = (event) => {
        if(event.target.innerHTML === "Logout"){
            console.log("User Logged out!")
            setUser(null);
        }
        else{
            navigate("/");
        }
        
    }

    useEffect(() => {
        if(!user){
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <div className=" flex justify-between px-4 bg-gradient-to-r from-cyan-500 to-purple-400 py-2 overflow-hidden text-white">
                <div className="flex">
                    <img 
                        className="rounded-2xl cursor-pointer"
                        width={30}
                        height={30}
                        src={weather_icon} 
                        alt="icon"
                    />
                    <span 
                        className="px-4 cursor-pointer">Weather App
                    </span>
                </div>
                <div className="flex">
                    <ThemeButton />
                    <span
                        className="px-4"
                    >
                        {user?.name?.split(' ')[0]}
                    </span>
                    <span 
                        onClick={(event) => login_logoutHandler(event)}
                        className={`px-2 cursor-pointer${!user ? 'ml-4' : ''}`} >
                        {user ? "Logout" : "Login"}
                    </span>
                    
                </div>
                
            </div>
        </>
    );
};

export default Navbar;