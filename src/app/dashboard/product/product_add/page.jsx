'use client'
import React, { useEffect, useState } from 'react';
import '../../style.css';
import '../../color/color.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [checkedColors, setCheckedColors] = useState([]);
    const router=useRouter();

    const handleSize = async () => {
        try {
            const response = await axios.
                get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/size/read-size`);
            if (response.status !== 200) return alert('something wrong')
            setSizes(response.data.data)
        }
        catch (error) {
            console.log(error)
            alert('something went wrong')
        }
    };

    const handleColor = async () => {
        try {
            const response = await axios.
                get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/color/read-color`);
            if (response.status !== 200) return alert('something wrong')
            setColors(response.data.data)
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')

        }
    };

    const handleProductCategory = async () => {
        try {
            const response = await axios.
                get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product-category/active-product-category`);
            if (response.status !== 200) return alert('something wrong')
            setCategories(response.data.data)
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    };

    const handleCheckSize = (e) => {
        if (e.target.checked) {
            setCheckedSizes((pre) => (
                [...pre, e.target.value]
            ))
        }
        else {
            setCheckedSizes((pre) => (
                pre.filter((size) => size !== e.target.value)
            ))
        }
    }

    const handleCheckColor = (e) => {
        if (e.target.checked) {
            setCheckedColors((pre) => (
                [...pre, e.target.value]
            ))
        }
        else {
            setCheckedColors((pre) => (
                pre.filter((color) => color !== e.target.value)
            ))
        }
    }

    const addProduct = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);

        formdata.append('color',JSON.stringify(checkedColors))

        formdata.append('size',JSON.stringify(checkedSizes))
        try {
            const response = await axios.
                post(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/add-product`, formdata);
            if (response.status !== 200) return alert('something went wrong');
            setProduct(response.data.data);
            alert('Product Added Successfully');
            router.push('/dashboard/product/product_view')
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    useEffect(() => {
        handleColor();
        handleSize();
        handleProductCategory();
    }, []);
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Add Product
            </div>
            <div className='main'>
                <div className='head'>
                    Product Detail
                </div>
                <form onSubmit={addProduct}>
                    <label>Product Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                    />

                    <label>Product Description</label>
                    <textarea
                        name='description'
                        placeholder='Description'
                        className='w-100 my-3 textarea-input' />

                    <label>Short Description</label>
                    <textarea
                        name='short_description'
                        placeholder='Short Description'
                        className='w-100 my-3 textarea-input' />

                    <label>Product Image</label>
                    <input type='file'
                        name='thumbnail'
                    />

                    <label>Image Animation</label>
                    <input type='file'
                        name='hover_thumbnail'
                    />

                    <label>Product Gallery</label>
                    <input type='file'
                        name='images'
                        multiple
                    />

                    <div className='d-flex gap-2'>
                        <div className='w-100'>
                            <label>Price</label>
                            <input
                                type='number'
                                placeholder='Product Price'
                                name='price' />
                        </div>
                        <div className='w-100'>
                            <label>MRP</label>
                            <input
                                type='number'
                                placeholder='Product MRP'
                                name='MRP' />
                        </div>
                    </div>

                    <label className='my-2'>Select Product Category</label><br />
                    <select className='select-input my-2' name='category'>
                        <option>--Select Product Category--</option>

                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category._id}>{category.name}</option>
                            )
                        })}
                        {/* <option name='tshirt'>T-Shirt</option>
                        <option name='shirt'>Shirt</option> */}
                    </select><br />

                    <div className='d-flex gap-2'>
                        <div className='w-100'>
                            <label className='my-2'>Manage Stock</label><br />

                            <select className='select-input my-2' name='stock'>
                                <option>--Select Stock--</option>
                                <option value={true} name='instock'>In Stock</option>
                                <option value={false} name='outofstock'>Out of Stock</option>
                            </select>
                        </div>

                        <div className='w-100'>
                            <label>Brand Name</label>
                            <input
                                type='text'
                                placeholder='Brand Name'
                                name='brand' />
                        </div>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className='w-100'>
                            <label className='my-2'>Size</label><br />

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr'
                            }}>
                                {sizes.map((size, index) => {
                                    return (
                                        <div>
                                            <input
                                                onClick={handleCheckSize}
                                                key={index}
                                                type='checkbox'
                                                value={size._id}
                                                style={{
                                                    margin: '3px 5px',
                                                    width: '20%',
                                                }} />
                                            <lable>{size.size_name}</lable>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className='w-100'>
                            <label className='my-2'>Color</label><br />
                            <div style={
                                {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                }
                            }>
                                {colors.map((color, index) => {
                                    return (
                                        <div>
                                            <input
                                                onClick={handleCheckColor}
                                                key={index}
                                                type='checkbox'
                                                value={color._id}
                                                style={{
                                                    margin: '3px 5px',
                                                    width: '10%'
                                                }}
                                            />
                                            <lable>{color.colorName}</lable>
                                            <span
                                                style={
                                                    {
                                                        backgroundColor: color.colorcode,
                                                        width: '20px',
                                                        height: '20px',
                                                        display: 'inline-block',
                                                        borderRadius: '50%',
                                                        marginLeft: '5px',
                                                        border: '1.5px solid black'
                                                    }
                                                }></span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <label>Status : </label>&nbsp;
                    <input type='radio' value={true} name='status' className='radio-btn' /> Display &nbsp;&nbsp;&nbsp;
                    <input type='radio' value={false} name='status' className='radio-btn' /> Hide<br />

                    <button className='btn-form'>Add Product</button>
                </form>
            </div>
        </div>
    )
}

export default page