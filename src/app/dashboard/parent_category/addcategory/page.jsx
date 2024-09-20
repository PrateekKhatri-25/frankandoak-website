'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router=useRouter();
  
  const handelAddCategory = async(e) => {
    e.preventDefault();
    // const data=e.targer;
    try{
      const response=await axios.post
      ('http://localhost:5200/api/admin-panel/parent-category/insert-parent-category'
        ,{
          name:e.target.name.value,
          description:e.target.description.value,
          status:e.target.status.value
        }
      )
      if(response.status !== 200) return alert('something wrong')
      alert('parent category added')
      console.log(response);

      router.push('/dashboard/parent_category/viewcategory')
    }
    catch(error){
      console.log(error);
      alert('something went wrong')
    }
  }
  return (
    <div>
      <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Add Category
      </div>
      <div className='main'>
        <div className='head'>
          Add Category
        </div>
        <form onSubmit={handelAddCategory} method='post'>
          <label>Category Name</label><br />
          <input 
          type='text' 
          name='name'
           placeholder='Category Name' 
           className='w-100' />

          {/* <label>Category Image</label>
          <input type='file' /> */}

          <label>Category Description</label>
          <textarea 
          name='description' 
          placeholder='Category Description' 
          className='w-100 my-3 textarea-input' />

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
           className='btn-form'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default page