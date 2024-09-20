'use client'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '../../../color/color.css';
import '../../../../style.css';
import axios from 'axios';
import Image from 'next/image';

const page = () => {
    const {_id}=useParams();
    const [product,setProduct]=useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [checkedSizes, setCheckedSizes] = useState([]);
    const [checkedColors, setCheckedColors] = useState([]);
    const [selectCategory,setSelectCategory]=useState([]);
    const router = useRouter();
    const [imgPreview, setImgPreview] = useState({});


    const handleFileSelect = (e) => {
        const fieldname = e.target.name;

        const reader = new FileReader();

        const file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file)
        }
        reader.onloadend = () => {
            // setImgPreview({...imgPreview,[fieldname]:reader.result})
            setImgPreview((prevState) => ({ ...prevState, [fieldname]: reader.result }))
        }
    }

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

    const handleFetchProduct=async()=>{
        if(!_id){
            alert('Product not found')
            return router.push('/dashboard/product/view-product')
        }
        try{
            const response=await axios.
            get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/read-product-by-id/${_id}`);

            if(response.status!==200) return alert('something wrong');

            console.log(response.data.data.size);

            const productSize=response.data.data.size.map((size)=>size._id);

            setCheckedSizes(productSize);

            const productColor=response.data.data.color.map((color)=>color._id);

            setCheckedColors(productColor);

            const productCategory=response.data.data.category._id;

            setSelectCategory(productCategory)

            setProduct(response.data.data);
            // console.log(response.data.data);
        }
        catch(error){
            console.log(error);
            alert('something went wrong')
        }
    };

    useEffect
        (() => {
            handleSize();
            handleColor();
            handleProductCategory();
            handleFetchProduct();
        }, []);

    const handleUpdateProduct=async(e)=>{
        e.preventDefault();
        const data=new FormData(e.target);

        data.append('color',JSON.stringify(checkedColors))
        data.append('size',JSON.stringify(checkedSizes))
        console.log(JSON.stringify(checkedSizes));

        try{
            const response=await axios.
            put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/update-product/${_id}`,data);

            if(response.status!==200) return alert('something wrong');

            alert('Product updated successfully');

            router.push('/dashboard/product/product_view');
        }
        catch(error){
            console.log(error);
            alert('something went wrong')
        }
    };
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Update Product
            </div>
            <div className='main'>
                <div className='head'>
                    Product Update
                </div>
                <form onSubmit={handleUpdateProduct} method='post'>
                    <label>Product Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={product.name}
                        onChange={(e)=>{setProduct({...product,name:e.target.value})}}
                    />

                    <label>Product Description</label>
                    <textarea
                        name='description'
                        placeholder='Description'
                        value={product.description}
                        onChange={(e)=>{setProduct({...product,description:e.target.value})}}
                        className='w-100 my-3 textarea-input' />

                    <label>Short Description</label>
                    <textarea
                        name='short_description'
                        placeholder='Short Description'
                        value={product.short_description}
                        onChange={(e)=>{setProduct({...product,short_description:e.target.value})}}
                        className='w-100 my-3 textarea-input' />

                    

                    <label>Product Image</label><br/>

                    <Image src={imgPreview.thumbnail} height={100} width={100} /><br />

                    <input type='file'
                        name='thumbnail'
                        onChange={handleFileSelect}
                    />

                    
                    <label>Image Animation</label><br/>

                    <Image src={imgPreview.hover_thumbnail} height={100} width={100} /><br />
                    <input type='file'
                        name='hover_thumbnail'
                        onChange={handleFileSelect}
                    />
                    {/* {
                        imgPreview.images && imgPreview.images.map((img, index) => (
                            <Image
                                src={img}
                                height={100}
                                width={100}
                                key={index}
                            />
                        ))
                    } */}

                    <label>Product Gallery</label>
                    <input type='file'
                        name='images'
                        multiple
                        // onChange={handleFileSelect}
                    />

                    <div className='d-flex gap-2'>
                        <div className='w-100'>
                            <label>Price</label>
                            <input
                                type='number'
                                placeholder='Product Price'
                                name='price'
                                value={product.price}
                                onChange={(e)=>{setProduct({...product,price:e.target.value})}}
                                 />
                        </div>
                        <div className='w-100'>
                            <label>MRP</label>
                            <input
                                type='number'
                                placeholder='Product MRP'
                                value={product.MRP}
                                onChange={(e)=>{setProduct({...product,MRP:e.target.value})}}
                                name='MRP' />
                        </div>
                    </div>

                    <label className='my-2'>Select Product Category</label><br />
                    <select className='select-input my-2' name='category'>
                        <option disabled>--Select Product Category--</option>

                        {categories.map((category, index) => {
                            return (
                                <option key={index} value={category._id} selected={selectCategory.includes(category._id)}>{category.name}</option>
                            )
                        })}
                        {/* <option name='tshirt'>T-Shirt</option>
                        <option name='shirt'>Shirt</option> */}
                    </select><br />

                    <div className='d-flex gap-2'>
                        <div className='w-100'>
                            <label className='my-2'>Manage Stock</label><br />

                            <select className='select-input my-2' name='stock'>
                                <option disabled>--Select Stock--</option>
                                <option value={true} name='instock'>In Stock</option>
                                <option value={false} name='outofstock'>Out of Stock</option>
                            </select>
                        </div>

                        <div className='w-100'>
                            <label>Brand Name</label>
                            <input
                                type='text'
                                placeholder='Brand Name'
                                value={product.brand}
                        onChange={(e)=>{setProduct({...product,brand:e.target.value})}}
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
                                                checked={checkedSizes.includes(size._id)}
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
                                                checked={checkedColors.includes(color._id)}
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


                    <button className='btn-form'>Update Product</button>
                </form>
            </div>
        </div>
    )
}

export default page