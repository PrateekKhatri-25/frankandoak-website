'use client'
import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import Image from 'next/image';
import logo from '../../../../public/images/FAO_logo2.jpg';
import Link from 'next/link';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoHeartOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import stockroom_men_header from '../../../../public/images/stockroom_men_header.jpg';
import stockroom_women_header from '../../../../public/images/stockroom_women_header.jpg';
import header_women1 from '../../../../public/images/header_women1.jpg';
import header_women2 from '../../../../public/images/header_women2.jpg';
import header_men1 from '../../../../public/images/header_men1.jpg';
import header_men2 from '../../../../public/images/header_men2.jpg';
import hover_img from "../../../../public/images/favicon.png";
import Who_we_are from '../../../../public/images/Who_we_are.jpg';
import jeans_story from '../../../../public/images/jeans_story.jpg';
import jacket_story from '../../../../public/images/jacket_story.jpg';
import factory_story from '../../../../public/images/factory_story.jpg';
import bundle_story from '../../../../public/images/bundle_story.jpg';
import cotton_story from '../../../../public/images/cotton_story.jpg';
import { FaBars } from 'react-icons/fa6';
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button';
import Loginform from './Loginform';
import { ContextAPI } from '@/app/context/Maincontext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [show, setShow] = useState(false);
  const [search,setSearch]=useState(false);
  const router=useRouter();
  const { cookiData,setCookiData,userLogin, setUserLogin, userData, setUserData } = useContext(ContextAPI);
  // console.log(userData);
  // const [show2,setShow2]=useState(false);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const handleLogout = () => {
    setUserLogin(false);
    setUserData({});
    Cookies.remove('userLogin')
  }

  const checkIfLogin=()=>{
    let cookie=Cookies.get('userLogin')
    if(cookie){
      cookie=JSON.parse(cookie);
      setCookiData(cookie);
      
      setUserLogin(true);
      
      // console.log(cookie);
    }
  };

  const handleSearch=()=>{
    if(search==false){
      router.push('/website/search')
      setSearch(!search);
    }
    else if(search==true){
      router.push('/')
      setSearch(!search);

    }
  }

  // console.log(search);


useEffect(()=>{
  checkIfLogin();
},[]);

// console.log(cookiData);

  // console.log(loginModal);
  return (
    <div>
      <header className='header'>
        <div className='bg-black text-white p-1'>
          <div className='w-60 mx-auto'>
            <Slider {...settings}>
              <div className='text-center fs-7'>
                <b>Just in: New organic cotton pieces for effortless looks.</b><u>Shop Women</u> <u>Shop Man</u>
              </div>
              <div className='text-center fs-7'>
                <b>These prices come once in a lifetime</b>.<u>Shop Women's Stockroom Sale</u> <u>Shop Man's Stockroom Sale</u>
              </div>
              <div className='text-center fs-7'>
                Enjoy <b>free shipping on orders over $ 99</b> and <b>free return</b>
              </div>
            </Slider>
          </div>
        </div>
        <div className='px-2 d-flex justify-contents-between position-sticky align-items-center bg-white w-100'>
          <div className='d-flex justify-contents-between w-80 header_inner'>

            <abbr title='logo'><Link href='/' className='cursor-pointer'><Image src={logo} width={150} height={30} className='mt-1' /></Link></abbr>


            <ul className=' d-flex justify-content-around align-items-center m-0 header_items'>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='The Stockroom Sale'><li className='mx-2 fs-6 p-2 text-danger stockroom'>

                The Stockroom Sale
                <div className='mega_menu_stockroom text-black'>
                  <div>
                    <div className='fs-7 my-3'><u>Women's Stockroom Sale</u></div>
                    <ul>
                      <Link href='/website/clothing' style={{ 'color': 'black', 'textDecoration': 'none' }}><li>Shop All</li></Link>
                      <li>Accessories starting at $10</li>
                      <li>Tops starting at $20</li>
                      <li>Swimwear at $20</li>
                      <li>Bottoms starting at $20</li>
                      <li>Dresses at $40</li>
                      <li>Blazers at $65</li>
                      <li>Jackets starting at $75</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Men's Stockroom Sale</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Accessories starting at $10</li>
                      <li>Tops starting at $20</li>
                      <li>Swimwear at $20</li>
                      <li>Bottoms starting at $20</li>

                      <li>Blazers at $65</li>
                      <li>Jackets starting at $75</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={stockroom_women_header} width={300} className='my-4' />
                    <div className='inner_text'>Women's Stockroom Sale</div>
                  </div>
                  <div className='position-relative'>
                    <Image src={stockroom_men_header} width={300} className='my-4' />
                    <div className='inner_text'>Men's Stockroom Sale</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Women'><li className='mx-2 fs-6 p-2 women'>
                Women
                <div className='mega_menu_women'>
                  <div>
                    <div className='fs-7 my-3'><u>Featured</u></div>
                    <ul>
                      <li>New In</li>
                      <li>Best Sellers</li>
                      <li>Linen,the frabic of summer</li>
                      <li>The Originals</li>
                      <li>Workwear</li>
                      <li>Gift Cards</li>
                      <li className='text-danger'>Sale</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Clothing</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li> T-shirts & Tops</li>
                      <li>Blouses & Shirts</li>
                      <li>Dresses & Jumpsuits</li>
                      <li>Skirts & Shorts</li>
                      <li>Swimwear</li>
                      <li>Matching Sets</li>
                      <li>Sweaters & Cardigans</li>
                      <li>Jackets & Coats</li>
                      <li>Denim</li>
                      <li>Pants</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Accessories</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Caps & Hats</li>
                      <li>Shoes & Boots</li>
                      <li>Bags</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_women1} width={300} height={400} className='my-4' />
                    <div className='inner_text'>Shorts</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_women2} width={250} height={400} className='my-4' />
                    <div className='inner_text'>T-shirts & Tops</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Men'><li className='mx-2 fs-6 p-2 men'>
                Men
                <div className='mega_menu_men'>
                  <div>
                    <div className='fs-7 my-3'><u>Featured</u></div>
                    <ul>
                      <li>New In</li>
                      <li>Best Sellers</li>
                      <li>Linen,the frabic of summer</li>
                      <li>The Originals</li>
                      <li>Workwear</li>
                      <li>Gift Cards</li>
                      <li className='text-danger'>Sale</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Clothing</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>T-shirts & Tanks</li>
                      <li>Shirts & Polo Shirts</li>
                      <li>Shorts</li>
                      <li>Swimwear</li>
                      <li>Sweaters & Cardigans</li>
                      <li>Overshirts & Blazers</li>
                      <li>Jackets & Coats</li>
                      <li>Denim</li>
                      <li>Pants</li>
                    </ul>
                  </div>

                  <div>
                    <div className='fs-7 my-3'><u>Accessories</u></div>
                    <ul>
                      <li>Shop All</li>
                      <li>Caps & Hats</li>
                      <li>Shoes & Boots</li>
                      <li>Bags</li>
                    </ul>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_men1} width={250} height={300} className='my-4 ms-5' />
                    <div className='inner_text'>T-shirt</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={header_men2} width={250} height={300} className='my-4' />
                    <div className='inner_text'>Shorts</div>
                  </div>

                </div>
              </li></abbr>

              <abbr style={{ 'textDecoration': 'none', 'cursor': 'pointer' }} title='Our Story'><li className='mx-2 fs-6 p-2 our_story'>
                Our Story
                <div className='mega_menu_story'>

                  <div className='position-relative'>
                    <Image src={Who_we_are} width={180} height={300} />
                    <div className='inner_text'>Who we are</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={cotton_story} width={180} height={300} />
                    <div className='inner_text'>Sustainable Pracitices</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={jeans_story} width={180} height={300} />
                    <div className='inner_text'>Design Philosophy</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={jacket_story} width={180} height={300} />
                    <div className='inner_text'>Frabic</div>
                  </div>

                  <div className='position-relative'>
                    <Image src={bundle_story} width={180} height={300} />
                    <div className='inner_text'>Circular Denim <sup>TM</sup></div>
                  </div>

                  <div className='position-relative'>
                    <Image src={factory_story} width={180} height={300} />
                    <div className='inner_text'>Partner & Factories</div>
                  </div>

                </div>
              </li></abbr>

            </ul>

          </div>
          <div className='text-end w-25'>

            <HiMagnifyingGlass onClick={handleSearch} className='fs-3 cursor-pointer mx-2' />

            {
              userLogin ?
                <div className='after-user-login'>
                  <IoPersonCircleOutline className='fs-3 cursor-pointer ' />
                  <div className='user-hover-loggedin'>
                    <div className=' bg-main-title'>
                      My Account
                    </div>
                    <div className='bg-ul-hover'>
                      <ul className='mx-0 p-0'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <li> {`Hi, ${cookiData.f_name}  !`} </li>
                          <Image src={hover_img} height={25} width={25} alt='frankandoak' />
                        </div>

                        <li><hr /></li>

                        <div className='d-flex justify-content-between'>
                          <li> Points: </li>
                          <div>20</div>
                        </div>

                        <li><hr/></li>

                        <div className='d-flex justify-content-between'>
                          <li> Tier: </li>
                          <div>Community</div>
                        </div>

                        <li><hr/></li>

                      </ul>
                      <button className='hover-btn'>View Dashboard</button>
                    </div>
                    <div className='login-footer'>
                      <ul className='mx-0 p-0'>
                        <li className='cursor-pointer'> <Link href='/website/wishlist' style={{color:'black',textDecoration:'none'}}>
                        Wishlist &nbsp;<IoHeartOutline/> 
                        </Link></li>

                        <li className='cursor-pointer'>Orders & Returns</li>
                        <li className='cursor-pointer'>Address book</li>
                        <li className='cursor-pointer'>Account settings</li>
                        <li className='mt-5'><hr/></li>
                      </ul>
                      <button className='logout-btn' onClick={handleLogout}>Log out</button>
                    </div>
                  </div>
                </div>
                :
                <IoPersonCircleOutline
                  className='fs-3 cursor-pointer mx-2 position-relative'
                  onClick={() => { setLoginModal(!loginModal) }} />
            }




            <div className={
              loginModal ? 'model' : 'd-none'
            }>
              <Loginform close={setLoginModal} />
            </div>


            {/* <div className='modal'>
              hello model
            </div> */}

            <Link href='/website/wishlist' style={{ 'color': 'black' }}><IoHeartOutline className='fs-3 cursor-pointer mx-2' /></Link>

            {/* offcanvas */}


            <Link href='/website/add-to-cart' style={{ 'color': 'black' }}>
              <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' />
            </Link>



            {/* <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' /> */}

            {/* <button className='btn-header' onClick={() => setShow(true)}>
                
                <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-2 me-3' />
              </button>

              <Offcanvas show={show} onHide={() => setShow(false)} placement='end' name='end' key='1'>

                <Offcanvas.Header closeButton>
                  <HiMagnifyingGlass className='fs-3 cursor-pointer mx-2' />
                </Offcanvas.Header>


                <Offcanvas.Body className='p-0'>
                  <div>

                    <div className='width'>
                      <ul className=''>
                        <li className='text-danger'>The Stockroom Sale</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Our Story</li>
                      </ul>
                    </div>

                  </div>
                </Offcanvas.Body>
              </Offcanvas> */}

          </div>
        </div>
      </header>

      <div className='ress'>
        <header>
          <div className='bg-black text-white p-1'>
            <div className='w-60 mx-auto'>
              <Slider {...settings}>
                <div className='text-center fs-8'>
                  <b>Just in: New organic cotton pieces for effortless looks.</b><u>Shop Women</u> <u>Shop Man</u>
                </div>
                <div className='text-center fs-8'>
                  <b>These prices come once in a lifetime</b>.<u>Shop Women's Stockroom Sale</u> <u>Shop Man's Stockroom Sale</u>
                </div>
                <div className='text-center fs-8'>
                  Enjoy <b>free shipping on orders over $ 99</b> and <b>free return</b>
                </div>
              </Slider>
            </div>
          </div>
          <div className='px-2 d-flex justify-contents-between position-sticky align-items-center bg-white w-100'>
            <div className='d-flex justify-contents-between w-80 header_inner'>

              {/* <FaBars className='mt-2 me-2 cursor-pointer' /> */}

              {/* offcanvas start */}
              <button className='btn-header' onClick={() => setShow(true)}>
                {/* Launch */}
                <FaBars className='me-3 cursor-pointer' />
              </button>

              <Offcanvas show={show} onHide={() => setShow(false)} placement='start' name='start' key='2'>

                <Offcanvas.Header closeButton>
                  <HiMagnifyingGlass className='fs-3 cursor-pointer mx-2' />
                </Offcanvas.Header>


                <Offcanvas.Body className='p-0'>
                  <div>

                    <div className='width'>
                      <ul className=''>
                        <li className='text-danger'>The Stockroom Sale</li>
                        <li>Women</li>
                        <li>Men</li>
                        <li>Our Story</li>
                      </ul>
                    </div>

                  </div>
                </Offcanvas.Body>
              </Offcanvas>
              {/* offcanvas end */}

              <abbr title='logo'><Link href='/' className='cursor-pointer'><Image src={logo} width={100} height={30} className='' /></Link></abbr>

            </div>
            <div className='text-end w-25'>
              <HiMagnifyingGlass className='fs-3 cursor-pointer mx-1' />

              <IoPersonCircleOutline className='fs-3 cursor-pointer mx-1' onClick={() => { setLoginModal(!loginModal) }} />
              <div className={loginModal ? 'model' : 'd-none'}>
                <Loginform close={setLoginModal} />

              </div>

              <Link href='/website/wishlist' style={{ color: "black" }}>
                <IoHeartOutline className='fs-3 cursor-pointer mx-1' />
              </Link>
              <Link href='/website/add-to-cart' style={{ color: "black" }}>
                <MdOutlineShoppingBag className='fs-3 cursor-pointer mx-1 me-3' />
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>

  )
}

export default Header