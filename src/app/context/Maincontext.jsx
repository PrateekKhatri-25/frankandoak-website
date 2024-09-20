import React, { createContext, useState } from 'react'

export const ContextAPI=createContext();
const Maincontext = ({children}) => {
    const [adminData,setAdminData]=useState({})
  return (
    <div>
        <ContextAPI.Provider value={{adminData,setAdminData}}>
            {children}
        </ContextAPI.Provider>
    </div>
  )
}

export default Maincontext