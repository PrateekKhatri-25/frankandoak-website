'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../color/color.css'
import '../../style.css';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const page = () => {
  const router=useRouter();
  const [parentCategories, setParentCategories] = useState([]);
  const [imgPreview,setImgPreview]=useState({});

  const fetchParentCategories = async () => {
    try {
      const response = await axios.
        get('http://localhost:5200/api/admin-panel/parent-category/active-parent-category');
      if (response.status !== 200) return alert('something wrong')
      setParentCategories(response.data.data);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  }

  useEffect(() => {
    fetchParentCategories()
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.
        post('http://localhost:5200/api/admin-panel/product-category/insert-product-category', e.target);
      console.log(response);
      if (response.status !== 200) return alert('something wrong')
      alert('successfully add product category')
      router.push('/dashboard/product_category/viewproduct')
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
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
    console.log(imgPreview);
}
  return (
    <div>
      <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Add Category
      </div>
      <div className='main'>
        <div className='head'>
          Add Product Category
        </div>
        <form method='post' onSubmit={handleAddCategory}>
          <label>Category Name</label><br />
          <input
            type='text'
            name='name'
            placeholder='Category Name'
            className='w-100' />

          <br />
          <Image src={imgPreview.thumbnail} width={100} height={100}/><br/>
          <label>Category Image</label>
          <input 
          type='file' 
          name='thumbnail'
          onChange={handleFileSelect}
           /><br />

          <label>Parent Category</label><br />
          <select name='parent_category' className='w-100 p-2 rounded-3 my-3'>
            <option>Select Category</option>
            {
              parentCategories.map((category, index) => {
                return (
                  <option key={index} value={category._id}>{category.name}</option>
                )
              })
            }
          </select>

          <label>Category Description</label>
          <textarea name='description' placeholder='Category Description' className='w-100 my-3 textarea-input' />

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
            className='radio-btn'
          /> Hide<br />

          <button className='btn-form'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default page