import Link from 'next/link';
import React from 'react';
import '../../color/color.css';
import '../../style.css';

const page = () => {
    return (
        <div>
        <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Slider Detail
        </div>
            
            <div className='main'>
                <div className='head'>
                    Add Slider
                </div>
                <form>
                <label>Slider Name</label>
                <input type='text' placeholder='Slider Name' name='slider_name' />
                <label>Heading</label>
                <input type='text' placeholder='Heading' name='heading' />
                <label>Sub Heading</label>
                <input type='text' placeholder='Sub Heading' name='sub_heading' />
                <label>Slider Image</label>
                <input type='file' />
                <input type='radio' name='status' className='radio-btn' /> Display &nbsp;&nbsp;&nbsp;
                <input type='radio' name='status' className='radio-btn' /> Hide<br />

                <button className='btn-form'>Add Slider</button>
                </form>
            </div>
        </div>
    )
}

export default page