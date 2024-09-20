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

export default function Dashleft() {
  let [btn, setbtn] = useState(false)
  return (

    <div>
      <div className='title'> Frank and Oak</div>
      <div className='height-acc'>
        <ListGroup as="ul" className='m-2' >
          {/* <LiItem value="dashboard" />
        <LiItem value="Color" /> */}
          <ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color border-0 cursor-pointer rounded-3"}>
            <IoSpeedometerOutline /> Dashboard
          </ListGroup.Item>

          <ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color border-0 cursor-pointer rounded-3"}>
            <CiDroplet /> Color
          </ListGroup.Item>

          <ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color border-0 cursor-pointer rounded-3"}>
            <GoGear /> Profile
          </ListGroup.Item>

        </ListGroup>

        <div className='left-color-gray fw-bold'> ECOMMERCE COMPONENTS</div>
        <Accordion>
          <Accordion.Item eventKey="0" className='p-0 m-0 border-0 '>
            <Accordion.Header className='bg-color border-0 font-size-left'>
              <div className='font-size-left'>
                <TbHandFinger className='fs-5' /> &nbsp;&nbsp;&nbsp;
                Size
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color border-0'>
            <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Size Detail</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              View Size</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className='p-0 m-0 border-0'>
            <Accordion.Header className='bg-color border-0'>
              <div className='font-size-left'>
                <RiBarChartHorizontalLine />&nbsp;
                &nbsp;
                Parent Category
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color'>
            <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Add Category</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              View Category </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className='p-0 m-0 border-0'>
            <Accordion.Header className='bg-color border-0 font-size-left'>
              <div className='font-size-left'>
                <BiSolidBabyCarriage />&nbsp;
                Product Category
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color'>
            <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Add Product Category</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              View Product Category</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className='p-0 m-0 border-0'>
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
                <BsBasket /> &nbsp;&nbsp;&nbsp;
                Product
              </div>
            </Accordion.Header>
            <Accordion.Body className='bg-color'>
              {/* <ul type='circle'>
                <div className='onhover w-100'><li className='my-2 cursor-pointer'>Product Detail</li></div>
                <div className='onhover w-100'><li className='my-2 cursor-pointer'>Product Item</li></div>
              </ul> */}
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Product Detail</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              Product Item</p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4" className='p-0 m-0 border-0'>
          {/* <button className='bg-color'> */}
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
              <GiBackwardTime />
              &nbsp;&nbsp;&nbsp;
                Story
              </div>
            </Accordion.Header>
            {/* </button> */}
            <Accordion.Body className='bg-color'>
            <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Story Detail</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              Story Item</p>
            </Accordion.Body>
          </Accordion.Item>
          
          <div>
            <p className='order-left onhover'><TfiPencilAlt /> &nbsp;
            Order</p>
          </div>

          <Accordion.Item eventKey="5" className='p-0 m-0 border-0'>
          {/* <button className='bg-color'> */}
            <Accordion.Header className='fs-5'>
              <div className='font-size-left'>
              <GiBackwardTime />
              &nbsp;&nbsp;&nbsp;
                Slider
              </div>
            </Accordion.Header>
            {/* </button> */}
            <Accordion.Body className='bg-color'>
            <p className='onhover p-2 w-100'><PiCircleLight className='width-circle'/> &nbsp;
              Slider Detail</p>
              <p className='onhover p-2 w-100'><PiCircleLight className='width-circle' /> &nbsp;
              Slider View</p>
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
//       <ListGroup.Item as="li" onClick={() => setbtn(!btn)} className={btn == true ? "active onhover fs-6 bg-color border-0 cursor-pointer rounded-3 " : "onhover fs-6 bg-color border-0 cursor-pointer rounded-3"}>
//         <IoSpeedometerOutline /> &nbsp;&nbsp;{value}
//       </ListGroup.Item>
//     </>
//   )
// }


