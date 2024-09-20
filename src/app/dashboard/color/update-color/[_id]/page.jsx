'use client'
import Image from 'next/image';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '../../color.css'
import axios from 'axios';



const page = () => {
    const { _id } = useParams();
    const [imgPreview, setImgPreview] = useState({})
    const router = useRouter();

    const [color, setColor] = useState([]);

    const handleFetchColor = async () => {
        if (!_id) {
            alert('Color not found');
            return router.push('/dashboard/color/viewcolor');
        }
        try {
            const response = await axios.
                get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/color/read-color-by-id/${_id}`);

            if (response.status !== 200) return alert('something wrong');
            // console.log(response.data.data);

            setColor(response.data.data);
        }
        catch (error) {
            console.log(error);
            alert('something went wrong');
        }
    };

    useEffect(() => {
        handleFetchColor();
    }, []);

    useEffect(() => {
        const colorPicker = new window.EyeDropper();
        const colorCode = document.querySelector('#color_code');
        const color_picker = document.querySelector('#color_picker')
        const colorSelector = document.querySelector('#colorpicker');
        colorSelector.addEventListener('click', () => {
            colorPicker
                .open()
                .then((res) => {
                    colorCode.value = res.sRGBHex;
                    color_picker.value = res.sRGBHex;
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }, [])

    const handleUpdateColor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.
                put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/color/update-color/${color._id}`, color);

            if (response.status !== 200) return alert('something wrong');

            alert('Color updated');

            router.push('/dashboard/color/viewcolor');
        }
        catch (error) {
            console.log(error);

            alert('something went wrong');
        }
    }

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

    return (
        <div>
            <div>
                <div className='p-3 border-gray'>
                    <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Color
                </div>
                <div className='main'>
                    <div className='head'>
                        Update Color
                    </div>
                    <form method='post' onSubmit={handleUpdateColor}>
                        <div >
                            <label>Color Name</label><br />
                            <input
                                type='text'
                                name='colorName'
                                placeholder='Category Name'
                                className='w-100'
                                value={color.colorName}
                                onChange={(e) => { setColor({ ...color, colorName: e.target.value }) }}

                            />

                            {/* <label>color code</label>
                            <input
                                name='colorcode'
                                id='color_code'
                                placeholder='Category Description'
                                className='w-100 my-3 textarea-input'
                                value={color.color}
                                onChange={(e) => { setColor({ ...color, color: e.target.value }) }}
                            /> */}

                            <label>Color Code</label><br />
                            <input
                                type='text'
                                name='colorcode'
                                id='color_code'
                                placeholder='Enter Color Name'
                                value={color.colorcode}
                                onChange={(e) => { setColor({ ...color, colorcode: e.target.value }) }}
                            /><br />

                            <label htmlFor='color'>Color Picker</label><br />
                            <input
                                type='color'
                                name='colorPicker'
                                id='color_picker'
                                className='color-picker-size' /><br />
                        </div>

                        <label>Select Product</label><br />

                        <Image
                            src={imgPreview.productImage}
                            width={100}
                            height={100}
                        ></Image>

                        <input
                            type='file'
                            name='productImage'
                            onChange={handleFileSelect}
                        /><br />

                        <button
                            type='button'
                            className='btn-form'
                            id='colorpicker'
                        >
                            Pick Color
                        </button>
                        <br />

                        <button
                            type='submit'
                            className='btn-form'
                        >Update Color</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page