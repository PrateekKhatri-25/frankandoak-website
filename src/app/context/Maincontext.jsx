import React, { createContext, useState } from 'react'

export const ContextAPI=createContext();
const Maincontext = ({children}) => {
    const [adminData,setAdminData]=useState({});
    const [userLogin,setUserLogin]=useState(false);
    const [userData,setUserData]=useState({});

    const [viewUser,setViewUser]=useState({});
    const [cartData,setCartData]=useState({});
    const [wishData,setWishData]=useState({});
    const [iconToWish,setIconToWish]=useState(false)
  return (
    <div>
        <ContextAPI.Provider value={{adminData,setAdminData,userLogin,setUserLogin,userData,setUserData,viewUser,setViewUser,wishData,setWishData,cartData,setCartData,iconToWish,setIconToWish}}>
            {children}
        </ContextAPI.Provider>
    </div>
  )
}

export default Maincontext