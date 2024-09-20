'use client'
import React from 'react'
import Header from '../common_components/Header'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import Footer from '../common_components/Footer'
import './clothing.css'
import Link from 'next/link'
import Image from 'next/image'
import tshirt from '../../../public/images/tshirts.jpg'
import { IoHeartOutline } from 'react-icons/io5'

const page = () => {
    return (
        <div>
            <Header />
            <div>
                <div className='text-center bg-color'>
                    <div className='fs-3 fw-bold'> The Stockroom Sale</div>
                    <div className='fs-5 my-2'>Incomparable price,from warehouse to you.</div>
                </div>
                <Row className='px-3 py-5 m-0'>
                    <Col xl={3} className='scroll'>
                        <div><Link href='/' className='active'>Home</Link> /<span className='active'> Women</span> </div>
                        <div className='fs-5 my-3'>The Stockroom Sale</div>
                        
                        <Accordion defaultActiveKey="0" flush className=' z-index-1'>
                            <Accordion.Item eventKey="0" className='z-index-1'>
                            
                                <Accordion.Header className='z-index-1 p-0'>Subcategory</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'><input type='checkbox' /> Tops </li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Sweaters</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Blazers</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Button-Down Shirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Shorts & Skirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Dresses</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Overshirts</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Pants</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Denim</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Jackets</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> Accessories</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className='z-index-1'>
                                <Accordion.Header className='z-index-1'>Size</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500 d-flex flex-wrap gap-4'>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>XXS</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>XS</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>S</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>M</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>L</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2'>XL</span></li>
                                        <li className='cursor-pointer'><span className='border border-1 p-2 w-25'>ONE SIZE</span></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Color</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-success p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Green</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-black p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Black</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-light p-1 px-2'></span> &nbsp;&nbsp;&nbsp;White</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-blue p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Blue</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-beige p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Beige</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-brown p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Brown</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black bg-secondary p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Gray</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-purple p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Purple</li>
                                        <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black color-yellow p-1 px-2'></span> &nbsp;&nbsp;&nbsp;Yellow</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Price</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        <li className='cursor-pointer'><input type='checkbox' /> $0-$50</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $50-$100</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $100-$200</li>
                                        <li className='cursor-pointer'><input type='checkbox' /> $250-$500</li>

                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        <div className='border border-1 my-3'></div>

                        <div>
                            <div className='fw-bold fs-12 my-3'>Featured</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='text-success lh-lg cursor-pointer'>New In</li>
                                <li className='lh-lg cursor-pointer'>Best Seller</li>
                                <li className='lh-lg cursor-pointer'>The Originals</li>
                                <li className='lh-lg cursor-pointer'>Workwear</li>
                                <li className='lh-lg cursor-pointer'>Sale</li>
                            </ul>

                            <div className='fw-bold fs-12 my-3'>Clothing</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='lh-lg cursor-pointer'>Shop All</li>
                                <li className='lh-lg cursor-pointer'>T-Shirts & Tops</li>
                                <li className='lh-lg cursor-pointer'>Blouses & Shirts</li>
                                <li className='lh-lg cursor-pointer'>Dresses & Jumpsuite</li>
                                <li className='lh-lg cursor-pointer'>Skirts & Shorts</li>
                                <li className='lh-lg cursor-pointer'>Sweaters & Cardigans</li>
                                <li className='lh-lg cursor-pointer'>Blazers & Overshirts</li>
                                <li className='lh-lg cursor-pointer'>Jackets & Coats</li>
                                <li className='lh-lg cursor-pointer'>Denim</li>
                                <li className='lh-lg cursor-pointer'>Pants</li>
                            </ul>

                            <div className='fw-bold fs-12 my-3'>Accessories</div>
                            <ul className='p-0 m-0 fs-14'>
                                <li className='lh-lg cursor-pointer'>Shop All</li>
                                <li className='lh-lg cursor-pointer'>Caps & Hats</li>
                                <li className='lh-lg cursor-pointer'>Shoes & Boots</li>
                                <li className='lh-lg cursor-pointer'>Bags</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xl={9} className='p-3'>
                        <div className='fs-4 my-3'>New In</div>

                        <Row xl={4} >
                            <Col className='mx-2 cursor-pointer p-0 z-index-1' style={{'width':'200px'}}>
                            <div className='cards z-index-1' style={{ 'width': '200px','position':'relative' }}>
                            <Image src={tshirt} width={200} className='' />
                            <div className='clothing-button'>
                                Quick Add
                            </div>
                            <div className='d-flex'>
                               <div>
                               <p className='fs-12 fw-bold my-3'>The Stripped Long Sleeve T-shirt in spruce</p>
                               <p className='fs-12 fw-bold'>$69.50</p>
                               </div>
                               <div>
                               <IoHeartOutline className='my-3'/>
                               </div>
                            </div>
                        </div>
                            </Col>

                            <Col className='mx-2 cursor-pointer p-0' style={{'width':'200px'}}>
                            <div className='cards z-index-1' style={{ 'width': '200px','position':'relative' }}>
                            <Image src={tshirt} width={200} />
                            <div className='clothing-button'>
                                Quick Add
                            </div>
                            <div className='d-flex'>
                               <div>
                               <p className='fs-12 fw-bold my-3'>The Stripped Long Sleeve T-shirt in spruce</p>
                               <p className='fs-12 fw-bold'>$69.50</p>
                               </div>
                               <div>
                               <IoHeartOutline className='my-3'/>
                               </div>
                            </div>
                        </div>
                            </Col>

                            <Col className='mx-2 cursor-pointer p-0' style={{'width':'200px'}}>
                            <div className='cards z-index-1' style={{ 'width': '200px','position':'relative' }}>
                            <Image src={tshirt} width={200} />
                            <div className='clothing-button'>
                                Quick Add
                            </div>
                            <div className='d-flex'>
                               <div>
                               <p className='fs-12 fw-bold my-3'>The Stripped Long Sleeve T-shirt in spruce</p>
                               <p className='fs-12 fw-bold'>$69.50</p>
                               </div>
                               <div>
                               <IoHeartOutline className='my-3'/>
                               </div>
                            </div>
                        </div>
                            </Col>

                            <Col className='mx-2 cursor-pointer p-0' style={{'width':'200px'}}>
                            <div className='cards z-index-1' style={{ 'width': '200px','position':'relative' }}>
                            <Image src={tshirt} width={200} />
                            <div className='clothing-button'>
                                Quick Add
                            </div>
                            <div className='d-flex'>
                               <div>
                               <p className='fs-12 fw-bold my-3'>The Stripped Long Sleeve T-shirt in spruce</p>
                               <p className='fs-12 fw-bold'>$69.50</p>
                               </div>
                               <div>
                               <IoHeartOutline className='my-3'/>
                               </div>
                            </div>
                        </div>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default page