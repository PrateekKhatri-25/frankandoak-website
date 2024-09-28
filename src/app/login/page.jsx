'use client'
import React, { useEffect, useState } from 'react'
import './login.css'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa6'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();
    const [pass, setPass] = useState(true);

    const checkifLoggedin = () => {
        let cookieData = (Cookies.get('adminlogin'))
        
    
        if (cookieData) {
          router.push('/dashboard')
        }
      }

    const handellogin = async (e) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        try {
            const response = await axios.post(`http://localhost:5200/api/admin-panel/admin/login`, formData);
            // despatch(storing(response.data.data))
            if (response.status === 200) {

                Cookies.set("adminlogin", JSON.stringify(response.data.data), { expires: 7 })

                router.push('/dashboard')
                
                console.log(response.data.data);
            }
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
            // window.Notification("something went wrong")
        }
    }
    useEffect(()=>{
        checkifLoggedin()
    },[])

    return (
        <div className='body'>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <FaKey className='login-key text-success' />
                        <div className="col-lg-12 login-title">
                            ADMIN PANEL
                        </div>

                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={handellogin}>
                                    <div className="form-group">
                                        <label className="form-control-label">Email</label>
                                        <input type="text" name="email" placeholder='Enter Your Email' className="form-control input-text" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">Password</label>
                                        <div className='d-flex'>
                                            <input type={(pass == true) ? "password" : "text"} name='password' placeholder='Enter Your Password' className="form-control input-pass" />
                                            {pass == true ?
                                                <FaEye onClick={() => setPass(!pass)} className='text-white cursor-pointer' />
                                                :
                                                <FaEyeSlash onClick={() => setPass(!pass)} className='text-white cursor-pointer' />
                                            }
                                        </div>
                                    </div>
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text">
                                        </div>
                                        <div className="col-lg-6 login-btm login-button d-flex justify-content-between w-100">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                            <div className='text-color cursor-pointer'>Forgot Password?</div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </div>
    )
}

export default page