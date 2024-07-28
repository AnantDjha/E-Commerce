import { createContext, useRef } from "react";

export const navContext = createContext();

export const NavProvider = ({children})=>{
    const navRef = useRef()
    return (
        <navContext.Provider value={{navRef}}>
            {children}
        </navContext.Provider>
    )
}