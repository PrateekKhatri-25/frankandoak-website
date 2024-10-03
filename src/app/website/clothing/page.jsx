'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common_components/Header'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import Footer from '../common_components/Footer'
import './clothing.css'
import Link from 'next/link'
import Image from 'next/image'
import tshirt from '../../../../public/images/tshirts.jpg'
import { IoHeartOutline } from 'react-icons/io5'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loader from '@/app/dashboard/dash_common/Loader'
import { FaHeart } from 'react-icons/fa6'
import { ContextAPI } from '@/app/context/Maincontext'

const page = () => {
    const [products, setProducts] = useState([]);
    const [productCat, setProductCat] = useState([]);
    const [colors, getColors] = useState([]);
    const { iconToWish, setIconToWish } = useContext(ContextAPI);
    // const [iconToWish, setIconToWish] = useState(true)
    const [filepath, setFilepath] = useState({});
    const [Size, setSize] = useState([]);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/active-product`);

            if (response.status !== 200) {
                Swal.fire({
                    title: "Something went wrong",
                    text: `${error.message}`,
                    icon: "question"
                });
                return
            }

            setProducts(response.data.data);
            setFilepath(response.data.file_path);

        }
        catch (error) {
            console.log('error', error);
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            });
        }
    };

    const activeCategories = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product-category/active-product-category`);

            if (response.status !== 200) return (
                Swal.fire({
                    title: "Something went wrong",
                    text: `${response.data.message}`,
                    icon: "question"
                })
            )
            setProductCat(response.data.data);

        }
        catch (error) {
            console.log('error', error);
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            });
        }
    };

    const activeColors = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/color/active-colors`);

            if (response.status !== 200) return (
                Swal.fire({
                    title: "Something went wrong",
                    text: `${response.data.message}`,
                    icon: "question"
                })
            )
            getColors(response.data.data);
        }
        catch (error) {
            console.log('error', error);
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            });
        }
    };

    const activeSize = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/size/active-size`);

            if (response.status !== 200) return (
                Swal.fire({
                    title: "Something went wrong",
                    text: `${response.data.message}`,
                    icon: "question"
                })
            )

            setSize(response.data.data);

        }
        catch (error) {
            console.log('error');
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            });
        }
    };

    useEffect(() => {
        getProducts();
        activeCategories();
        activeColors();
        activeSize();
    }, []);
    console.log(colors);

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
                                        {
                                            productCat.map((cat, index) => {
                                                return (
                                                    <li className='cursor-pointer'><input type='checkbox' /> {cat.name}</li>
                                                )
                                            })
                                        }

                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className='z-index-1'>
                                <Accordion.Header className='z-index-1'>Size</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500 d-flex flex-wrap gap-4'>
                                        {
                                            Size.map((size, index) => {
                                                return (
                                                    <li className='cursor-pointer'><span className='border border-1 p-2'>{size.size_name}</span></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Color</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='p-0 m-0  fw-500'>
                                        {
                                            colors.map((color, index) => {
                                                return (
                                                    <li className='cursor-pointer'><span className='rounded-circle border border-1 border-black p-1 px-2'
                                                        style={{
                                                            backgroundColor: color.colorcode
                                                        }}
                                                    ></span> &nbsp;&nbsp;&nbsp;{color.colorName}</li>
                                                )
                                            })
                                        }
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

                            {
                                products.length == 0
                                    ?
                                    <Loader />
                                    :
                                    products.map((product, index) => {
                                        return (
                                            <div>

                                                <Col className='mx-2 cursor-pointer p-0 z-index-1' style={{ 'width': '200px', 'height': '430px' }}>

                                                    <div className='cards  cursor-pointer' style={{ 'width': '200px', 'position': 'relative' }}>

                                                        <Link href={`/website/clothing/${product._id}`} style={{ color: 'black', textDecoration: 'none' }}>

                                                            <img src={filepath + product.thumbnail} className='img' width={200} height={300} />

                                                            <img src={filepath + product.hover_thumbnail} className='image_hover' width={200} height={300} />
                                                        </Link>

                                                        <div className='discount'>
                                                            -{
                                                               Math.floor(
                                                                    ((product.MRP - product.price) / product.MRP) * 100
                                                               )
                                                            }%
                                                        </div>

                                                        <div className='clothing-button'>
                                                            Quick Add
                                                            <div className='add-size'>
                                                                {
                                                                    product.size.map((size, index) => {
                                                                        return (
                                                                            <div
                                                                                className={`m-2 p-1`}>
                                                                                {size.size_name}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className='d-flex w-100 justify-content-between position-absolute'
                                                            style={{
                                                                top: '291px'
                                                            }}
                                                        >

                                                            <div>
                                                                <p className='fs-12 fw-bold my-3'>
                                                                    {product.name}
                                                                </p>

                                                                <div className='fs-12'>Price:
                                                                    <span className='fs-12 fw-bold'>
                                                                        {product.price}Rs.
                                                                    </span>
                                                                </div>

                                                                <span className='fs-12'>MRP: </span>

                                                                <strike className='text-danger fs-12 '>
                                                                    {product.MRP}Rs.
                                                                </strike>

                                                                <div>

                                                                    <span className='color-color'>
                                                                        color {product.color.length}
                                                                    </span>
                                                                    <span>
                                                                        {
                                                                            product.color.map((color, index) => {
                                                                                return (
                                                                                    <span
                                                                                        key={index}
                                                                                        className='bg-color-color'
                                                                                        style={{
                                                                                            backgroundColor: color.colorcode
                                                                                        }}
                                                                                    >
                                                                                    </span>
                                                                                )
                                                                            })
                                                                        }
                                                                    </span>
                                                                </div>

                                                            </div>

                                                            <div>

                                                                {
                                                                    iconToWish == false
                                                                        ?
                                                                        <IoHeartOutline className='my-3' onClick={() => setIconToWish(true)} />
                                                                        :
                                                                        <FaHeart className='my-3' onClick={() => setIconToWish(false)} />
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>

                                                </Col>

                                            </div>
                                        )
                                    })
                            }


                        </Row>

                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    )
}

export default page

// const Singleproduct = ({ product, filepath }) => {
//     const { iconToWish, setIconToWish } = useContext(ContextAPI);
//     console.log(iconToWish);
//     return (
//         <div className='position-relative'>

//         </div>
//     )
// }