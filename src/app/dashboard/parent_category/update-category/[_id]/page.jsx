'use client'
import axios from 'axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const page = () => {
  const { _id } = useParams();
  const [category, setCategory] = useState([])
  const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_SERVER_NAME);

  const handleFetchCategory = async () => {
    // console.log(_id);
    if (!_id) {
      alert('Category not found')
      console.log(_id);
      return router.push('/dashboard/parent_category/viewcategory')
    }
    try {
      const response = await axios.
        get(`http://localhost:5200/api/admin-panel/parent-category/read-parent-category-by-id/${_id}`);

      if (response.status !== 200) return alert('something wrong');
      // console.log(_id);

      // console.log(response.data.data);

      if (response.status !== 200) return alert('something wrong')
      setCategory(response.data.data)
      // console.log(category);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  }
  useEffect(() => {
    handleFetchCategory()
  }, []);

  const handleUpdateCategory=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.
      put(`http://localhost:5200/api/admin-panel/parent-category/update-parent-category/${category._id}`,category);

      if(response.status!==200) return alert('something wrong')
      alert('category updated')
      router.push('/dashboard/parent_category/viewcategory');
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
          <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Update Category
        </div>
        <div className='main'>
          <div className='head'>
            Update Category
          </div>
          <form onSubmit={handleUpdateCategory}>
                <div key={category._id}>
                  <label>Category Name</label><br />
                  <input
                    type='text'
                    name='name'
                    placeholder='Category Name'
                    className='w-100'
                    value={category.name}
                    onChange={(e)=>{setCategory({...category,name:e.target.value})}}
                    />

                  <label>Category Description</label>
                  <textarea
                    name='description'
                    placeholder='Category Description'
                    className='w-100 my-3 textarea-input'
                    value={category.description}
                    onChange={(e)=>{setCategory({...category,description:e.target.value})}}
                     />
                </div>

            <button
              type='submit'
              className='btn-form'
              >Update Category</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page