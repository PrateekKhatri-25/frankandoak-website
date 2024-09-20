import React, { useState } from 'react'
import './dashleft.css'
import { Accordion, ListGroup } from 'react-bootstrap'
import { IoSpeedometerOutline } from "react-icons/io5";
import { CiDroplet } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { TbHandFinger } from "react-icons/tb";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { BiSolidBabyCarriage } from "react-icons/bi";
import { BsBasket } from "react-icons/bs";
import { GiBackwardTime } from "react-icons/gi";
import { PiCircleLight } from "react-icons/pi";
import { TfiPencilAlt } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from 'next/link';

export default function Dashleft() {
  let [btn, setbtn] = useState(false)
  return (

    <div>
      <div className='title' style={{ 'background': '#212631', 'color': 'white' }}> Frank and Oak</div>
      <div className='height-acc' style={{ 'background': '#212631' }}>
        <ListGroup as="ul" className='m-2' style={{ 'background': '#212631' }} >
          {/* <LiItem value="dashboard" />
        <LiItem value="Color" /> */}
          <Link href='/dashboard' style={{ 'textDecoration': 'none' }}><ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3"}>
            <IoSpeedometerOutline /> Dashboard
          </ListGroup.Item></Link>

          {/* <Link href='/dashboard/color' style={{ 'textDecoration': 'none' }}><ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3"}>
            <CiDroplet /> Color
          </ListGroup.Item></Link> */}

          <Link href='/dashboard/profile' style={{ 'textDecoration': 'none' }}><ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3"}>
            <GoGear /> Profile
          </ListGroup.Item></Link>

        </ListGroup>

        <div className='left-color-gray fw-bold bg-color1' > ECOMMERCE COMPONENTS</div>
        <Accordion style={{ 'background': '#212631' }}>

        <Accordion.Item eventKey="0" className='p-0 m-0 border-0 bg-color1' style={{ 'color': 'white' }}>
            <Accordion.Header className='bg-color1 border-0 font-size-left'>
              <div className='font-size-left'>
                <CiDroplet  className='fs-5' /> &nbsp;&nbsp;&nbsp;
                Color
              </div>
            </Accordion.Header>

            <Accordion.Body className='bg-color1 border-0'>

              <Link href='/dashboard/color/addcolor' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100 '><PiCircleLight className='width-circle' /> &nbsp;
                  Add Color</p>
              </Link>
              <Link href='/dashboard/color/viewcolor' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  View Color</p>
              </Link>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className='p-0 m-0 border-0 bg-color1' style={{ 'color': 'white' }}>
            <Accordion.Header className='bg-color1 border-0 font-size-left'>
              <div className='font-size-left'>
                <TbHandFinger className='fs-5' /> &nbsp;&nbsp;&nbsp;
                Size
              </div>
            </Accordion.Header>

            <Accordion.Body className='bg-color1 border-0'>

              <Link href='/dashboard/size_detail/addsize' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100 '><PiCircleLight className='width-circle' /> &nbsp;
                  Size Detail</p>
              </Link>
              <Link href='/dashboard/size_detail/viewsize' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  View Size</p>
              </Link>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className='p-0 m-0 border-0 bg-color1'>
            <Accordion.Header className='bg-color1 border-0'>
              <div className='font-size-left'>
                <RiBarChartHorizontalLine />&nbsp;
                &nbsp;
                Parent Category
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color1'>

              <Link href='/dashboard/parent_category/addcategory' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Add Category</p>
              </Link>
              <Link href='/dashboard/parent_category/viewcategory' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  View Category </p>
              </Link>

            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className='p-0 m-0 border-0 bg-color1'>
            <Accordion.Header className='bg-color1 border-0 font-size-left'>
              <div className='font-size-left'>
                <BiSolidBabyCarriage />&nbsp;
                Product Category
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color1'>

              <Link href='/dashboard/product_category/addproduct' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Add Product Category</p>
              </Link>
              <Link href='/dashboard/product_category/viewproduct' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  View Product Category</p>
              </Link>

            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4" className='p-0 m-0 border-0 bg-color1'>
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
                <BsBasket /> &nbsp;&nbsp;&nbsp;
                Product
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color1'>

              <Link href='/dashboard/product/product_add' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Add Product</p>
              </Link>
              <Link href='/dashboard/product/product_view' style={{ 'textDecoration': 'none' }}>

                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  View Product</p>
              </Link>

            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5" className='p-0 m-0 border-0 bg-color1'>
            {/* <button className='bg-color1'> */}
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
                <GiBackwardTime />
                &nbsp;&nbsp;&nbsp;
                Story
              </div>
            </Accordion.Header>
            {/* </button> */}
            <Accordion.Body className='bg-color1'>
              <Link href='/dashboard/story/story_detail' style={{'textDecoration':'none'}}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Story Detail</p>
              </Link>
              <Link href='/dashboard/story/view_story' style={{'textDecoration':'none'}}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Story Item</p>
              </Link>
            </Accordion.Body>
          </Accordion.Item>

          <div>
            <Link href='/dashboard/order' style={{ 'textDecoration': 'none' }}>
              <p className='order-left onhover'><TfiPencilAlt /> &nbsp;
                Order</p>
            </Link>
          </div>

          <Accordion.Item eventKey="6" className='p-0 m-0 border-0 bg-color1'>
            {/* <button className='bg-color1'> */}
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
                <GiBackwardTime />
                &nbsp;&nbsp;&nbsp;
                Slider
              </div>
            </Accordion.Header>
            {/* </button> */}
            <Accordion.Body className='bg-color1'>

              <Link href='/dashboard/slider/slider_detail' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Slider Detail</p>
              </Link>
              <Link href='/dashboard/slider/view_slider' style={{ 'textDecoration': 'none' }}>
                <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
                  Slider View</p>
              </Link>
            </Accordion.Body>
          </Accordion.Item>

          

          <div>
            <p className='order-left onhover font-size-left'><IoDocumentTextOutline /> &nbsp;&nbsp;
              Terms & Conditions</p>
          </div>
        </Accordion>
      </div>
    </div>


  )
}

// function LiItem({ value }) {
//   let [btn, setbtn] = useState(false)
//   return (
//     <>
//       <ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color1 border-0 cursor-pointer rounded-3"}>
//         <IoSpeedometerOutline /> &nbsp;&nbsp;{value}
//       </ListGroup.Item>
//     </>
//   )
// }


