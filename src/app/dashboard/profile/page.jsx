'use client'
import React, { useContext, useState } from 'react';
import '../style.css';
import '../color/color.css'
import Link from 'next/link';
import profile_img from '../../../../public/images/profile_img.jpg';
import Image from 'next/image';
import { FaEye, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import logo_img from '../../../../public/images/FAO_logo1.webp';
import favicon from '../../../../public/images/favicon.jpg';
import { ContextAPI } from '@/app/context/Maincontext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const page = () => {
    const { adminData, setAdminData } = useContext(ContextAPI);
    const router = useRouter();
    let [pass, setPass] = useState(false);
    const [ifOtp, setIfOtp] = useState(false);
    const [imgPreview, setImgPreview] = useState({})
    const [otpBtnText, setOtpBtnText] = useState('Generate OTP')
    let path = '';

    const handelGenerateOtp = async () => {

        setIfOtp(true);
        let otpTimer = 60;
        setOtpBtnText(`Regenerate OTP in ${otpTimer}s`);
        const timer = setInterval(() => {
            otpTimer--;
            setOtpBtnText(`Regenerate OTP in ${otpTimer}s`);
            if (otpTimer == 0) {
                clearInterval(timer);
                setOtpBtnText('Generate OTP');
                setIfOtp(false)
            }
        }, 1000);
        setIfOtp(true);

        try {
            const response = await axios.post('http://localhost:5200/api/admin-panel/admin/generate-otp', adminData);
            if (response.status !== 200) return alert('something went wrong');

            alert('OTP has sent')
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    const handelUpdateEmail = async () => {
        try {
            const response = await axios.post(`http://localhost:5200/api/admin-panel/admin/update-email/${adminData._id}`, adminData);

            if (response.status !== 200) return alert("something went wrong")

            alert('Email updated successfully')

            Cookies.remove('adminlogin')
            router.push('/login')
        }
        catch (error) {
            console.log(error);
            alert('please try after sometime')
        }
        // console.log(adminData);
    }

    const handleFileSelect = (e) => {
        const fieldname = e.target.name;

        const reader = new FileReader();

        const file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file)
        }
        reader.onloadend = () => {
            // setImgPreview({...imgPreview,[fieldname]:reader.result})
            setImgPreview((prevState) => ({ ...prevState, [fieldname]: reader.result }))
        }
    }

    const handelUpdateAdmin = async (e) => {
        e.preventDefault();
        const data = e.target;
        // console.log(data);
        try {
            const response = await axios.put(`http://localhost:5200/api/admin-panel/admin/update-admin/${adminData._id}`, data)
            console.log(response);
            if (response.status !== 200) return alert("something  wrong")
            alert('admin data updated successfully')

            path = response.data.path
            console.log(path);

            Cookies.remove('adminlogin')
            router.push('/login')
            const footerlogoimg = path + adminData.footerlogo;
            const faviconimg = path + adminData.favicon;
            const logoimg = path + adminData.logo;

            console.log(logoimg);
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Profile
            </div>
            <div>
                <div className='main'>
                    <div className='head'>
                        Profile
                    </div>
                    <form onSubmit={handelUpdateAdmin}>
                        <div className='d-flex justify-content-between'>
                            <div className='w-50'>
                                <label>Name</label>
                                <input type='text'
                                    placeholder='enter your name'
                                    name='name'
                                    value={adminData.name}
                                    onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                                    className='w-100' />

                                <label>Social Link</label><br />

                                <FaFacebookF />&nbsp;&nbsp;&nbsp;
                                <input
                                    type='text'
                                    placeholder='enter facebook link'
                                    name='fb'
                                    onChange={(e) => setAdminData({ ...adminData, fb: e.target.value })}
                                    className='w-75'
                                    value={adminData.fb}
                                /><br />

                                <FaInstagram />&nbsp;&nbsp;&nbsp;
                                <input
                                    type='text'
                                    placeholder='enter instagram link'
                                    className='w-75'
                                    name='insta'
                                    onChange={(e) => setAdminData({ ...adminData, insta: e.target.value })}
                                    value={adminData.insta}
                                /><br />

                                <FaYoutube />&nbsp;&nbsp;&nbsp;
                                <input
                                    type='text'
                                    placeholder='enter youtube link'
                                    className='w-75'
                                    name='yt'
                                    onChange={(e) => setAdminData({ ...adminData, yt: e.target.value })}
                                    value={adminData.yt}
                                /><br />

                                <BsTwitterX />&nbsp;&nbsp;&nbsp;
                                <input
                                    type='text'
                                    placeholder='enter twitter link'
                                    className='w-75'
                                    name='twitter'
                                    onChange={(e) => setAdminData({ ...adminData, twitter: e.target.value })}
                                    value={adminData.twitter}
                                /><br />
                                {/*  */}
                                <label>Logo</label><br />
                                <Image src={imgPreview.logo /*|| logoimg*/} width={100} height={100} className='my-3' /><br />
                                <input
                                    type='file'
                                    name='logo'
                                    onChange={handleFileSelect}
                                />

                                <label>Sub Logo</label><br />
                                <Image src={imgPreview.favicon /*|| faviconimg*/} width={100} height={100} className='my-3' /><br />
                                <input
                                    type='file'
                                    name='favicon'
                                    onChange={handleFileSelect}
                                />

                                <lable>Footer Logo</lable><br />
                                <Image src={imgPreview.footerlogo /*|| footerlogoimg*/} width={100} height={100} className='my-3' /><br />
                                <input
                                    type='file'
                                    name='footlogo'
                                    onChange={handleFileSelect}
                                />
                            </div>
                            <div className='text-center'>
                                <div className='rounded-circle border-gray mx-auto'>
                                    <Image src={profile_img} className='rounded-circle' />
                                    {/* <input type='file'
                                    name='profile'
                                    className='w-25' /> */}
                                </div>
                                <div>Profile Image</div>
                            </div>
                        </div>
                        <label>Password</label>
                        <div className='d-flex justify-content-center align-items-center input-border'>
                            <input type={pass == true ? "text" : "password"}
                                placeholder='enter your password'
                                value={adminData.password}
                                name='password'
                                onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                                className='w-100 border-0 m-0' />
                            <FaEye className='me-1 cursor-pointer' onClick={() => setPass(!pass)} />
                        </div>
                        <button
                            type='submit'
                            className='btn-form'>Update</button>

                    </form>
                </div>

                <div className='main my-2'>
                    <div className='head'>Email Authentication</div>
                    <form>
                        <label>Email</label><br />
                        <input
                            type='email'
                            placeholder='enter your email'
                            className='w-100'
                            onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                            value={adminData.email}
                        />
                        <div style={{ display: (ifOtp) ? '' : 'none' }}>
                            <label>OTP</label><br />
                            <input
                                type='number'
                                placeholder='enter OTP'
                                className='w-100'
                                name='userotp'
                                onChange={(e) => setAdminData({ ...adminData, userotp: e.target.value })}
                            />

                            <label>New Email</label><br />
                            <input
                                type='text'
                                placeholder='enter New Email here'
                                className='w-100'
                                name='newemail'
                                onChange={(e) => setAdminData({ ...adminData, newemail: e.target.value })}
                            />
                        </div>
                        <button
                            disabled={ifOtp}
                            type='button'
                            className={(ifOtp) ? 'btn-form bg-secondary' : 'btn-form'}
                            onClick={handelGenerateOtp}
                        >
                            {otpBtnText}
                        </button>
                        <br />
                        <button
                            type='button'
                            onClick={handelUpdateEmail}
                            style={{ display: (!ifOtp) ? 'none' : '' }}
                            className='btn-form'>
                            Update Email
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default page