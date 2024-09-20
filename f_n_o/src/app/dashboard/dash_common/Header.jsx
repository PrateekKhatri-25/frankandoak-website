import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../style.css';
import { FaBars } from "react-icons/fa6";
import profile_img from '../../../../public/images/profile_img.jpg'
import Image from 'next/image';

export default function Header() {
  return (
    <div className='border-gray'>
        <Navbar expand="lg" className="bg-color ">
      <Container className='align-items-center'>
        <Navbar.Brand href="#home" className='bg-color'><FaBars className='color-gray'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  className='mt-2'>
          <Nav className="me-auto w-100 d-flex justify-content-between align-items-center">
          <div className='d-flex justify-content-between w-100'>
            <Nav.Link href="#home" className='bg-color'>Dashboard</Nav.Link>
              <Image src={profile_img} width={40} className='rounded-circle me-2'/>
          </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
