'use client'

import axios from 'axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { _id } = useParams();
  const router = useRouter();
  const [size, setSize] = useState([]);
  const handleFetchSize = async () => {
    if (!_id) return router.push('/dashboard/size_detail/viewsize');

    try {
      const response = await axios.
        get(`http://localhost:5200/api/admin-panel/size/read-size-by-id/${_id}`);

      if (response.status !== 200) return alert('something wrong');

      console.log(response.data.data);
      setSize(response.data.data)
      console.log(size);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  }
  useEffect(() => {
    handleFetchSize()
  }, []);

  const handleUpdateSize=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.
      put(`http://localhost:5200/api/admin-panel/size/update-size/${size._id}`,size);

      if(response.status!==200) return alert('something wrong')
      alert('size updated')
      router.push('/dashboard/size_detail/viewsize');
    }
    catch(error){
      console.log(error);
      alert('something went wrong')
    }
  }
  return (
    <div>
      <div>
        <div className='p-3 border-gray'>
          <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Update Size
        </div>
        <div className='main'>
          <div className='head'>
            Update Size
          </div>
          <form onSubmit={handleUpdateSize}>
            <label>Size Name</label><br />
            <input
              type='text'
              name='size_name'
              placeholder='Size Name'
              className='w-100'
              value={size.size_name} 
              onChange={(e) => { setSize({ ...size, size_name: e.target.value }) }}
              />

            <label>Size Order</label>
            <textarea
              name='size_order'
              placeholder='size order'
              className='w-100 my-3 textarea-input'
              value={size.size_order} 
              onChange={(e) => { setSize({ ...size, size_order: e.target.value }) }}
              />


            <button
              type='submit'
              className='btn-form'>Update Size</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page