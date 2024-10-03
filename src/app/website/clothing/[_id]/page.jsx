'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common_components/Header'
import Footer from '../../common_components/Footer'
import Image from 'next/image'
import '../clothing.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Placeholder, Ratio } from 'react-bootstrap'
import { IoHeartOutline } from 'react-icons/io5'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { PiArrowCounterClockwiseLight } from 'react-icons/pi'
import { ContextAPI } from '@/app/context/Maincontext'
import { FaHeart } from 'react-icons/fa6'

const page = () => {
    const { _id } = useParams();
    const { cookiData, setCookiData, cartData, setCartData, wishData, setWishData} = useContext(ContextAPI);
    const [iconToWish, setIconToWish] = useState(false);
    const [singleData, setSingleData] = useState({});
    const [filepath, setFilepath] = useState('');
    const [checkedSize, setCheckedSize] = useState([]);
    const [checkedColor, setCheckedColor] = useState([]);
    // console.log(cartData);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/read-product-by-id/${_id}`);

            if (response.status !== 200) return Swal.fire({
                title: "Something went wrong",
                text: `${response.data.message}`,
                icon: "question"
            });
            setSingleData(response.data.data);

            const sizes = response.data.data.size.map((v) => ({ 'name': v.size_name, 'id': v._id }))
            setCheckedSize(sizes);

            const colors = response.data.data.color.map((v) => ({ 'name': v.colorName, 'id': v._id, 'colorcode': v.colorcode }))
            setCheckedColor(colors);

            setFilepath('http://localhost:5200/frankandoak-files/products/');
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            });
        }
    };


    useEffect(() => {
        fetchProduct();
    }, []);

    const handleWishlist = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/wishlist/add-to-wishlist`, cartData);

            if (response.status !== 200) return Swal.fire({
                title: "Something went wrong",
                text: `${response.data.message}`,
                icon: "question"
            });

            setIconToWish(true)
            console.log(response);

            Swal.fire({
                title: "Success !!",
                text: "Data Added Successfully !!",
                icon: "success"
            })
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            })
        }
    };
    // console.log(singleData, filepath);

    const handleCartData = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/cart/add-to-cart`, cartData);

            if (response.status !== 200) return Swal.fire({
                title: "Something went wrong",
                text: `${response.data.message}`,
                icon: "question"
            });

            Swal.fire({
                title: "Success !!",
                text: "Data Added Successfully !!",
                icon: "success"
            })
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: "Something went wrong",
                text: `${error.message}`,
                icon: "question"
            })
        }
    };
    return (
        <div>
            <Header />

            <div className='my-3 w-50 d-flex w-100'>
                <div className='d-flex w-50 flex-wrap'>
                    {singleData && singleData.images ? (
                        singleData.images.map((image, index) => {
                            return (
                                <div key={index} className='w-45 m-2 cursor-pointer'>
                                    <img src={filepath + image} alt="product image" width={290} height={400} />
                                </div>
                            )
                        })
                    ) :
                        <div className='d-flex flex-wrap w-100'>
                            <Ratio aspectRatio='1x1' className=' w-45 m-2 bg-secondary text-center'>
                                <div style={{ marginTop: "120px" }}>Image 1</div>
                            </Ratio>

                            <Ratio aspectRatio='1x1' className=' w-45 m-2 bg-secondary text-center'>
                                <div style={{ marginTop: "120px" }}>Image 2</div>
                            </Ratio>

                            <Ratio aspectRatio='1x1' className=' w-45 m-2 bg-secondary text-center'>
                                <div style={{ marginTop: "120px" }}>Image 3</div>
                            </Ratio>

                            <Ratio aspectRatio='1x1' className=' w-45 m-2 bg-secondary text-center'>
                                <div style={{ marginTop: "120px" }}>Image 4</div>
                            </Ratio>
                        </div>
                    }



                </div>

                <div className='my-3 w-45'>
                    {
                        singleData
                            ?
                            (singleData.length == 0 ?
                                <div className='w-100'>
                                    <Placeholder xs={6} />
                                    <Placeholder className="w-75" /> <Placeholder style={{ width: '25%' }} />
                                </div>
                                :
                                <div>
                                    <h3> {singleData.name} </h3>

                                    <div className='d-flex my-4'>
                                        <strike className='fw-bold'> {singleData.MRP}Rs. </strike>

                                        <p className='text-danger ms-4 fw-bold'>
                                            -{Math.floor((singleData.price / singleData.MRP) * 100)}%
                                        </p>
                                    </div>

                                    <p className='fw-bold'> {singleData.price}Rs. </p>

                                    <p className='fs-4'>Select a Size</p>

                                    <div>
                                        {
                                            checkedSize.map((v) => (
                                                <HandleSize singleData={v} />
                                            ))
                                        }


                                    </div>

                                    <p className='my-2 fs-4'>Select a Color</p>

                                    <div>
                                        {
                                            checkedColor.map((v) => (
                                                <Handlecolors singleData={singleData} v={v} />
                                            ))
                                        }
                                    </div>
                                    <div className='d-flex w-100'>

                                        <button onClick={handleCartData} className='w-75 bg-black text-center p-2 border-0 cursor-pointer text-white'> Add To Cart </button>
                                        {
                                            iconToWish == true ?
                                                <button className='w-25 border border-black border-2 mx-2 fs-2 bg-white p-2'> <FaHeart />  </button>
                                                :
                                                <button onClick={handleWishlist} className='w-25 border border-black border-2 mx-2 fs-2 bg-white p-2'> <IoHeartOutline />  </button>
                                        }
                                    </div>

                                    <p className='fs-4 my-3'>Description</p>
                                    <p className='fw-bold'> {singleData.description} </p>

                                    <div>
                                        <div> <hr /> </div>
                                        <div className='fs-12'>
                                            <MdOutlineLocalShipping className='fs-4' /> Free shipping over rs.500 &nbsp;&nbsp;
                                            <PiArrowCounterClockwiseLight className='fs-4' /> Free Returns
                                        </div>
                                        <div> <hr /> </div>
                                    </div>
                                </div>
                            )
                            :
                            null

                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page


function HandleSize(singleData) {
    const { cartData, setCartData } = useContext(ContextAPI);
    const [sizeColor, setSizeColor] = useState(false)

    const handlesize = (_id) => {
        const size_id = _id;
        setCartData({ ...cartData, size_id })
        // if (_id) {
        setSizeColor(!sizeColor);
        // }
    }
    return (
        <button className={` border border-black fs-14 mx-2 my-3 cursor-pointer ${sizeColor == true ? 'bg-black text-white' : 'bg-white'}`}
            onClick={() => handlesize(singleData.singleData.id)}>
            {singleData.singleData.name}
        </button>
    )
};


function Handlecolors({ singleData, v }) {
    const { cartData, setCartData, cookiData, setCookiData } = useContext(ContextAPI);

    const [colorBg, setColorBg] = useState(false)

    const handlecolor = (_id) => {
        const color_id = _id;

        const product_id = singleData._id;

        const user_id = cookiData.id;

        setCartData({ ...cartData, color_id, product_id, user_id })

        setColorBg(!colorBg);
    }
    return (

        <button
            className={`p-3 me-2 my-3 border border-black rounded-circle border-1 cursor-pointer fs-18 ${colorBg == true ? 'border-2 ' : ''}`
            }

            style={{
                backgroundColor: v.colorcode,
            }}

            onClick={() => handlecolor(v.id)}
        >
        </button>

    )
}




