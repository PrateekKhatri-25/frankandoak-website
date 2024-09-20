'use client'
import React from 'react';
import '../../style.css';
import '../../color/color.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const page = () => {
  const router = useRouter();
  const handelSize = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post
        ('http://localhost:5200/api/admin-panel/size/insert-size'
          , {
            size_name: e.target.size_name.value,
            size_order: e.target.size_order.value,
            status: e.target.status.value
          }
        )
      if (response.status !== 200) return alert('something wrong')
      alert('size added')
      console.log(response);

      router.push('/dashboard/size_detail/viewsize')
    }

    catch (error) {
      console.log(error);
      alert('something went wrong');
    }
  }
  return (
    <div>
      <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Add Size
      </div>
      <div className='main'>
        <div className='head'>
          Add Size
        </div>
        <form onSubmit={handelSize} method='post'>
          <label>Size Name</label><br />
          <input
            type='text'
            name='size_name'
            placeholder='size name'
            className='w-100' /><br />

          <label>Size Order</label><br />
          <input
            type='text'
            name='size_order'
            placeholder='size order'
            className='w-100' /><br />

          <label>Status : </label>&nbsp;
          <input
            type='radio'
            name='status'
            value={true}
            className='radio-btn' /> Display &nbsp;&nbsp;&nbsp;

          <input
            type='radio'
            name='status'
            value={false}
            className='radio-btn' /> Hide<br />

          <button
            className='btn-form'
            type='submit'
          >Add Size</button>
        </form>
      </div>
    </div>
  )
}

export default page