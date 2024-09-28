import React, { createContext, useState } from 'react'

export const ContextAPI=createContext();
const Maincontext = ({children}) => {
    const [adminData,setAdminData]=useState({});
    const [userLogin,setUserLogin]=useState(false);
    const [userData,setUserData]=useState({})
  return (
    <div>
        <ContextAPI.Provider value={{adminData,setAdminData,userLogin,setUserLogin,userData,setUserData}}>
            {children}
        </ContextAPI.Provider>
    </div>
  )
}

export default Maincontext