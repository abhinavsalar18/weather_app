import { createContext, useContext, useEffect, useState } from "react";
// import {useNavigate} from "react-router-dom"


export const UserContext = createContext(
    {
        user: null,
        setUser: () => {}
    }
);

export const UserProvider = UserContext.Provider;

export default function useUser(){
    return useContext(UserContext);
}
