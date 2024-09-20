'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import '../../../../style.css'
import Image from 'next/image';
import '../../../color/color.css';
import { useParams,useRouter } from 'next/navigation';

const page = () => {
  const { _id } = useParams();
  const router = useRouter();
  const [productCat, setProductCat] = useState([]);
  const [imgPreview, setImgPreview] = useState({});
  const [parentCategories, setParentCategories] = useState([]);


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

  const handleFetchProductCategory = async () => {
    if(!_id){
      alert('Category not found')
      return router.push('/dashboard/product_category/viewproduct')
    }
    try {
      const response = await axios.
        get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product-category/read-product-category-by-id/${_id}`);

      if (response.status !== 200) return alert('something wrong');

      setProductCat(response.data.data);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  };

  const updateProductCategory=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.
      put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product-category/update-product-category/${productCat._id}`,productCat);

      if(response.status!==200) return alert('something wrong')

      alert('category updated')

      router.push('/dashboard/product_category/viewproduct');
    }
    catch(error){
      console.log(error);

      alert('something went wrong');
    }
  };

  useEffect(() => {
    handleFetchProductCategory()
  },[]);

  return (
    <div>
      <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Add Category
      </div>
      <div className='main'>
        <div className='head'>
          Update Product Category
        </div>
        <form method='post' onSubmit={updateProductCategory}>
          <label>Category Name</label><br />
          <input
            type='text'
            name='name'
            placeholder='Category Name'
            value={productCat.name}
            onChange={(e)=>{setProductCat({...productCat,name:e.target.value})}}
            className='w-100' />

          <br />

          <label>Category Image</label><br />
          <Image src={imgPreview.thumbnail} width={100} height={100} /><br />
          <input
            type='file'
            name='thumbnail'
            // onChange={(e)=>{setProductCat({...productCat,thumbnail:e.target.files[0]})}}
            onChange={handleFileSelect}
          /><br />

          <label>Parent Category</label><br />
          <select name='parent_category' className='w-100 p-2 rounded-3 my-3'>
            <option>Select Category</option>
            {
              parentCategories.map((category, index) => {
                return (
                  <option
                   key={index} 
                   value={category._id}
                   selected={category._id === productCat.parent_category}
                   >{category.name}</option>
                )
              })
            }
          </select>

          <label>Category Description</label>
          <textarea
           name='description'
            placeholder='Category Description' 
            className='w-100 my-3 textarea-input'
            value={productCat.description}
            onChange={(e)=>{setProductCat({...productCat,description:e.target.value})}}
             />

          {/* <label>Status : </label>&nbsp;
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
          /> Hide<br /> */}

          <button className='btn-form'>Update Category</button>
        </form>
      </div>
    </div>
  )
}

export default page