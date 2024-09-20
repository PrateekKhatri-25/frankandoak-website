import Link from 'next/link';
import React from 'react';
import '../../color/color.css';
import '../../style.css';


 const page = () => {
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Story
            </div>
            <div className='main'>
                <div className='head'>
                    Our Story's
                </div>
                <form>
                    <label>Story Name</label>
                    <input 
                    type='text'
                     placeholder='Story Name'
                      name='name'/>

                    <label>Image</label>
                    <input 
                    type='file'/>

                    <label>Banner Image</label>
                    <input
                     type='file'/>

                    <label>Description</label><br/>
                    <textarea name='description' className='w-100'/>

                    <label>Status : </label>&nbsp;

                    <input type='radio' name='status' className='radio-btn' /> Display &nbsp;&nbsp;&nbsp;

                    <input type='radio' name='status' className='radio-btn' /> Hide<br />

                    <button className='btn-form'>Add Story</button>
                </form>

            </div>
        </div>
    )
}

export default page;