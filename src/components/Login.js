import {useState, useRef, useEffect} from "react"
import { authData } from "../constants";
import {useNavigate} from "react-router-dom"
import useUser from "../context/UserContext";
import Navbar from "./Navbar";
const Login = () => {
    const [errorMessage, setErrorMessage] = useState();
    const {user, setUser} = useUser();
    // console.log(data);

    const [user1, setUser1] = useState();
    const navigate = useNavigate();
    const username = useRef();
    const password = useRef();
    console.log("Login Component", user);
    const handleLogin = () => {
        
        const crnt_username = username.current.value, pass = password.current.value;
        if(!crnt_username || !pass){
            setErrorMessage("All fields are mandatory!");
            return;
        }
        // console.log(crnt_username, pass);

        const userData = authData.filter((data) => {
            if(data.username === crnt_username && data.password === pass){
                console.log(data.name + " logged in successfully!");
                setUser(data);
                setUser1(data);
                console.log(data, user, user1);
                return true;
            }

            return false;
        });
        
        console.log("userData: ", userData);
        if(userData.length === 0 || !userData){
            setErrorMessage("Invalid username or password!");
            return;
        }
        console.log("user: ", userData[0], user);
        navigate("/dashboard");
    }

    useEffect(() => {
        console.log("User: ", user);
    }, [user, errorMessage])
    return (
        <div className="min-h-[100vh] dark:bg-[rgb(61,61,61)]">
            <h2 className="text-center pt-6 text-gray-600 font-semibold dark:text-gray-300 text-lg">Login to use the Weather App</h2>
            <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="w-[80%] md:w-[75%] lg:w-[40%] mx-auto px-8 my-12 py-6 pb-10 rounded-lg dark:bg-[rgb(51,51,51)] dark:text-white border-2 border-cyan-300"
                >
                    <h1 className="font-bold text-3xl py-2 text-black dark:text-white">Login</h1>
                    <input 
                        ref={username}
                        type="text" 
                        placeholder="Username" 
                        className="p-4 my-4 w-full rounded-md border  text-black dark:bg-[rgb(51,51,51)] dark:text-white focus:border-cyan-300 focus:outline-none" 
                    />
                    
                    <input 
                        ref={password}
                        type="password" 
                        placeholder="Password" 
                        className="p-4 my-4 w-full rounded-md border text-black dark:bg-[rgb(51,51,51)] dark:text-white focus:border-cyan-300 focus:outline-none" 
                    />

                    {
                        errorMessage &&
                        <p className="text-[rgb(226,63,77)] text-lg py-2">{errorMessage}</p>
                    }
                    <button 
                        onClick={handleLogin}
                        className="text-lg p-2 my-4 text-white bg-gradient-to-r from-cyan-400 to-purple-400 w-full rounded-md border-2 hover:rounded-3xl transition-all duration-300">
                        Login
                    </button>
                </form>
        </div>
    )
}

export default Login;