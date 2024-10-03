'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ContextAPI } from '@/app/context/Maincontext'
import tshirt from '../../../../public/images/tshirts.jpg'
import Cookies from 'js-cookie'
import { Container } from 'react-bootstrap'
import Image from 'next/image'
import Loader from '@/app/dashboard/dash_common/Loader'
import './cart.css'

const page = () => {
    const { cookiData, setCookiData } = useContext(ContextAPI);
    const [cartItem, setCartItem] = useState([]);
    const [filepath, setFilepath] = useState([]);

    // console.log(cartItem);

    let cookieData = Cookies.get('userLogin');

    if (cookieData) {
        cookieData = JSON.parse(cookieData)
    }
    const handleCartData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/cart/view-cart/${cookieData.id}`);

            if (response.status !== 200) return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something went wrong'
                })
            )

            setCartItem(response.data.data);
            setFilepath(response.data.file_path)
        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'something went wrong'
            })
        }
    };

    useEffect(() => { handleCartData() }, []);

    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/cart/delete-cart-item/${_id}`);

            if (response.status !== 200) return (
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something went wrong'
                })
            )

            const indexNo = cartItem.map((item) => item._id === _id);
            const newData = [...cartItem];
            newData.splice(indexNo, 1);
            setCartItem(newData);

            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Item deleted successfully'
            })

        }
        catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'something went wrong'
            })
        }
    }

    const increase = (_id) => {
        // console.log(_id);

        const ind = cartItem.findIndex((datapre) => datapre._id === _id);
        const dataToUpdate = [...cartItem];
        if (dataToUpdate[ind].quantity < 8) {
            dataToUpdate[ind].quantity = dataToUpdate[ind].quantity + 1;
            setCartItem(dataToUpdate);
        }
    }

    const decrease = (_id) => {
        // console.log(_id);

        const ind = cartItem.findIndex((datapre) => datapre._id === _id);
        const dataToUpdate = [...cartItem];
        if (dataToUpdate[ind].quantity > 1) {
            dataToUpdate[ind].quantity = dataToUpdate[ind].quantity - 1;
            setCartItem(dataToUpdate);
        }
    }

    return (
        <div>
            <Header />
            <Container>
                <div className='my-5 d-flex justify-content-between'>
                    <div className='w-40'>
                        {
                            cartItem.length === 0
                                ?
                                <h1>
                                    <Loader />
                                </h1>
                                :
                                cartItem.map((item, index) => (
                                    <div className=''>

                                        <div className=' my-3 p-2 border border-1 border-danger rounded-top rounded-bottom'>
                                            <div className='d-flex position-relative'>
                                                <div className=''>
                                                    <img src={filepath + item.product_id.thumbnail} height={200} width={150} className='border rounded-top rounded-bottom' />
                                                </div>
                                                <div className='mx-3'>
                                                    <div
                                                        className='btn-cart'
                                                        onClick={() => handleDelete(item._id)}
                                                    >X</div>




                                                    <div>
                                                        <p>{item.product_id.name}</p>
                                                        <p>{item.size_id.size_name}</p>
                                                        <p
                                                            className='border border-1 border-black rounded-circle'
                                                            style={{
                                                                backgroundColor: item.color_id.colorcode,
                                                                padding: '7px 9px',
                                                                width: '10px'
                                                            }}
                                                        ></p>
                                                        <p>{item.product_id.price * item.quantity}</p>
                                                        <p>Quantity</p>
                                                        <div className='ms-2 border border-black border-2 d-flex justify-content-evenly'>
                                                            <span className=' cursor-pointer' onClick={() => { increase(item._id) }} >+</span>
                                                            <span className=''>{item.quantity}</span>
                                                            <span className=' cursor-pointer' onClick={() => { decrease(item._id) }}>-</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                )
                                )
                        }
                    </div>
                    <div>
                        <Subtotal data={cartItem} />

                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default page

function Subtotal({ data }) {
    // console.log(data);
    const subtotal = data.reduce((acc, item) => acc + item.product_id.price * item
        .quantity, 0);

    const tax = Math.floor(subtotal * (18 / 100));

    return (
        <div className='bg-black my-2 p-3 text-white ' style={{
            width: '400px'
        }}>

            <h1 className='text-center'>Subtotal</h1>

            <div className='d-flex fs-3 justify-content-between'>
                <p>Amount:</p>
                <p>₹{subtotal}</p>
            </div>

            <div className='d-flex fs-3 justify-content-between'>
                <p>Tax:</p>
                <p>₹{tax}</p>
            </div>

            <p className='fs-3'>
                Free Delivery
            </p>

            <div className='d-flex fs-3 justify-content-between'>
                <p>Total:</p>
                <p>₹{subtotal + tax}</p>
            </div>

            <button className='checkout-btn'>
                Checkout
            </button>


        </div>
    )
}

