'use client'
import React, { useEffect, useState } from 'react';
import '../../style.css';
import '.././color.css'
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ntc from 'ntcjs';

const page = () => {
    const [imgPreview, setImgPreview] = useState({})
    const router = useRouter();

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

    const handleAddColor = async (e) => {
        e.preventDefault();
        // const form=new FormData(e.target)
        try {
            const response = await axios.post
                ('http://localhost:5200/api/admin-panel/color/add-color'
                    , e.target
                )
            if (response.status !== 200) return alert('something wrong')
            alert('color added')
            console.log(response);

            router.push('/dashboard/color/viewcolor')
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }


    useEffect(() => {
        const colorPicker = new window.EyeDropper();
        // const ntc_match=
        const colorCode = document.querySelector('#color_code');
        const color_picker = document.querySelector('#color_picker');
        const color_name=document.querySelector('#color_name')
        const colorSelector = document.querySelector('#colorpicker');
        colorSelector.addEventListener('click', () => {
            colorPicker
                .open()
                .then((res) => {
                    colorCode.value = res.sRGBHex;
                    color_picker.value = res.sRGBHex;
                    const n_match=ntc.name(res.sRGBHex);
                    color_name.value=n_match[1];
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }, [])

    // let result=ntc.name(`${}`)

    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Color
            </div>
            <div className='main'>
                <div className='head'>
                    Add Color
                </div>
                <form onSubmit={handleAddColor}>
                    <label>Color Name</label><br />
                    <input
                        type='text'
                        name='colorName'
                        id='color_name'
                        placeholder='Enter Color Name' /><br />

                    <label>Color Code</label><br />
                    <input
                        type='text'
                        name='colorcode'
                        id='color_code'
                        placeholder='Enter Color Name' /><br />

                    <label htmlFor='color'>Color Picker</label><br />
                    <input
                        type='color'
                        name='colorPicker'
                        id='color_picker'
                        className='color-picker-size' /><br />

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

                    <label>Status : </label>&nbsp;
                    <input
                        type='radio'
                        name='status'
                        className='radio-btn'
                        value={true}
                    /> Display &nbsp;&nbsp;&nbsp;

                    <input
                        type='radio'
                        name='status'
                        value={false}
                        className='radio-btn' /> Hide<br />
                    <button
                        type='submit'
                        className='btn-form'>Add Color</button>
                </form>
            </div>
        </div>
    )
}

export default page