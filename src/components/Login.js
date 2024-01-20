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
        })

        if(!userData){
            setErrorMessage("Invalid username or password!");
            return;
        }
        console.log("user: ", userData[0], user);
        navigate("/dashboard");
    }

    useEffect(() => {
        console.log("User: ", user);
    }, [user])
    return (
        <div className="" style={{backgroundColor: "green"}}>
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="absolute mx-[8px] w-[96%] md:min-w-[450px] md:min-h-[450px] shadow-lg md:w-3/12 p-12 my-24 md:mx-auto left-0 right-0 rounded-md dark:bg-[rgb(51,51,51)] dark:text-white"
            >
                <h1 className="font-bold text-3xl py-2 text-black dark:text-white">Login</h1>
                <input 
                    ref={username}
                    type="text" 
                    placeholder="Username" 
                    className="p-4 my-4 w-full bg-gray- rounded-md border-2 text-black dark:bg-[rgb(51,51,51)] dark:text-white" 
                />
                  
                <input 
                    ref={password}
                    type="password" 
                    placeholder="Password" 
                    className="p-4 my-4 w-full rounded-md border-2 text-black dark:bg-[rgb(51,51,51)] dark:text-white" 
                />

                {
                    errorMessage &&
                    <p className="text-[rgb(226,63,77)] text-lg py-2">{errorMessage}</p>
                }
                <button 
                    onClick={handleLogin}
                    className="p-4 my-6 text-white bg-[rgb(29,164,208)] w-full rounded-md border-2 border-cyan-200">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;