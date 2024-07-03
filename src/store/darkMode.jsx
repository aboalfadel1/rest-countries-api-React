import { createContext, useEffect, useState,useContext } from "react";

import React from 'react'
const DarkModeContext = createContext()

export function DarkModeProvider({children}) {
    const [isDarkMode,setIsDarkMode]=useState(()=>{
        const savedPreference = localStorage.getItem('darkMode');
    return savedPreference ? JSON.parse(savedPreference) : false;
})
useEffect(()=>{
    localStorage.setItem("darkMode",JSON.stringify(isDarkMode))
    document.body.className = isDarkMode ? 'dark-mode' : '';
},[isDarkMode])
const toggleDarkMode=()=>{
    console.log(isDarkMode)
    setIsDarkMode((pre) => !pre)
}
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>

  )
}
export const useDarkMode = () => {
    return useContext(DarkModeContext);
  };
