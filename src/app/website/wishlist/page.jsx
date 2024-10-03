'use client'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import './wishlist.css'
import '../clothing/clothing.css'
import second_slider_img1 from '../../../../public/images/second_slider_img1.jpg'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa6'
import { IoHeartOutline } from 'react-icons/io5'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loader from '@/app/dashboard/dash_common/Loader'
import Link from 'next/link'
import { ContextAPI } from '@/app/context/Maincontext'

const page = () => {
  const {cartData,setCartData}=useContext(ContextAPI)
  const [wishItem, setWishItem] = useState([]);
  const [filepath,setFilepath]=useState('');

  let cookieData = Cookies.get('userLogin');

  if (cookieData) {
    cookieData = JSON.parse(cookieData)
  }
  const handleWishlist = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/wishlist/view-wishlist/${cookieData.id}`);

      if (response.status !== 200) return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      )

      setFilepath(response.data.file_path);

      setWishItem(response.data.data);

    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  const handleCart = async (_id) => {
    try{
      const {product_id,color_id,size_id,user_id,...cartWithoutIds}=wishItem;
      const response=await axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/cart/add-to-cart`,{
        product_id:cartWithoutIds[0].product_id._id,
        color_id:cartWithoutIds[0].color_id._id,
        size_id:cartWithoutIds[0].size_id._id,
        user_id:cartWithoutIds[0].user_id._id
      });
      console.log(response);
      if(response.status!==200) return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      )

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added to cart!',
      })

      const indexNo=wishItem.map((wish)=>wish._id === _id);
      const newData=[...wishItem];
      newData.splice(indexNo,1)
      setWishItem(newData);
    }
    catch(error){
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  useEffect(() => {
    handleWishlist();
  }, []);

  console.log(wishItem);

  const deleteWishItem=async(id)=>{
    try{
      const response=await axios.delete(`${process.env.NEXT_PUBLIC_HOST_NAME}api/frankandoak-services/wishlist/delete-wish-data/${id}`);

      if(response.status!==200) return (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      )

      const indexNo=wishItem.map((wish)=>wish._id===id);
      const newData=[...wishItem]
      newData.splice(indexNo,1);
      setWishItem(newData);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product removed from wishlist!',
      })
    }
    catch(error){
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  // console.log(wishItem);

  return (
    <div>
      <Header />
      <Container className='my-4 index-z'>
        <Row>
          <Col xl={3}>
            <div className='bg-color my-3'>
              <ul className='ul-wishlist'>
                <li>Orders & returns</li>
                <li>Address book</li>
                <li>Account settings</li>
                <li>Wishlist <IoHeartOutline /></li>
                <li>Frank Rewards</li>
                <li>Refer a Friend</li>
              </ul>
            </div>
          </Col>
          <Col xl={9}>
            <h2 className='my-3'>Wishlist</h2>
            <div className='grid-wishlist'>
              {
                wishItem.length == 0 ?
                  <div>
                    <Loader />
                  </div>
                  :
                  wishItem.map((item, index) => (
                    <div className='card position-relative border-0 ' style={{width:'200px',height:'450px'}}>
                      <Link href={`/website/clothing/${item.product_id._id}`}>

                        <img 
                        src={filepath+item.product_id.thumbnail} 
                        width={200} height={300} 
                        className='img w-100' alt=''/>

                        <img
                         src={filepath+item.product_id.hover_thumbnail} 
                         width={200} height={300}
                          className='img-hover w-100' alt=''
                          />

                          
                          <div className='btn-position'>
                            -{Math.floor(((item.product_id.MRP - item.product_id.price) / item.product_id.MRP)*100)}%
                          </div>
                          
                          

                      </Link>

                      <div className='btn-wishlist cursor-pointer' onClick={()=>handleCart(item._id)}>
                            Add To Cart
                          </div>
                      
                      
                            <div className='card-title fw-bold w-100 mb-0 mt-2 d-flex justify-content-between'>
                              <p>{item.product_id.name}</p>
                              <div>
                              <FaHeart className='fs-5 cursor-pointer'
                               onClick={()=>deleteWishItem(item._id)}/>
                              </div>
                            </div>
                            <div className='card-body p-0'>
                              <p className='fs-14'>
                                <strike className='text-danger'>{item.product_id.MRP}Rs.</strike>&nbsp;&nbsp;
                                 <span>{item.product_id.price}Rs.</span>
                              </p>
                              
                              <div>
                              <span className='color-color'> color 1</span>
                             
                             <span 
                             className='bg-color-color'
                             style={{
                               backgroundColor:item.color_id.colorcode
                             }}
                             ></span>
                              </div>
                            </div>

                              
                    </div>
                  ))
              }
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default page


// const Data = ({ item , filepath}) => {
//   console.log(item,filepath);
//   return (
    
//   )
// }