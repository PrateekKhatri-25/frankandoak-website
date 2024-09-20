import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../style.css';
import './Header.css';
import { FaBars } from "react-icons/fa6";
import profile_img from '../../../../public/images/profile_img.jpg';
import Image from 'next/image';
import { HiOutlineLockClosed } from "react-icons/hi2";
import { IoPersonOutline } from 'react-icons/io5';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ContextAPI } from '@/app/context/Maincontext';

export default function Header() {
  const {adminData,setAdminData}=useContext(ContextAPI)
  const router = useRouter();
  const [profile, setProfile] = useState(false);

  const checkifLoggedin = () => {
    let cookieData = (Cookies.get('adminlogin'))

    if(cookieData){
      cookieData=JSON.parse(cookieData)
      setAdminData(cookieData[0]);
      }
    if (!cookieData) {
      router.push('/login')
    }
  }

  const handelLogout = () => {
    Cookies.remove('adminlogin')
    router.push('/login')
  };

  useEffect(()=>{

  },[adminData])

  useEffect(() => {
    checkifLoggedin()
  }, [])
  return (
    <div className='border-gray position'>
      <Navbar expand="lg" className="bg-color ">
        <Container className='align-items-center'>
          <Navbar.Brand href="#home" className='bg-color'><FaBars className='color-gray' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='mt-2'>
            <Nav className="me-auto w-100 d-flex justify-content-between align-items-center">
              <div className='d-flex justify-content-between w-100'>
                <Nav.Link href="#home" className='bg-color'>Dashboard</Nav.Link>
                <Image src={profile_img} width={40} onClick={() => setProfile(!profile)} className='rounded-circle me-2 cursor-pointer' />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={(profile == true) ? 'clickable' : 'd-none'}>
        <div className='head'>Account</div>
        <ul className='my-0'>
          <li><Link href='/dashboard/profile' style={{ 'textDecoration': 'none', 'color': 'black' }}> <IoPersonOutline className='fs-5' /> profile</Link> </li>
          <li>
            <HiOutlineLockClosed className='fs-5' />
            <button onClick={handelLogout} className='btn-every'> Lock Account</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
