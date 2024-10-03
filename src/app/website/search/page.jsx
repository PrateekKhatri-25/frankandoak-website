'use client'
import React, { useState } from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Container } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'

const page = () => {

    const [searchData,setSearchData]=useState([]);
    const [filepath,setfilepath]=useState();
    const handleSearch = async(e) => {
        try{
            const response=await axios.get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/search-product/${e.target.value}`);

            if(response.status!==200) return(
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'please enter some data to search'
                })
            )

            setSearchData(response.data.data);
            setfilepath(response.data.file_path);
        }
        catch(error){
            console.log(error)
            Swal.fire({
                icon: 'question',
                title: 'Hi there',
                text: 'please enter some data to search',
            })
        }
    };

    console.log(searchData);

  return (
    <div>
        <Header/>
        <Container>
        <input
         type='text'
          placeholder='search...' 
          onChange={handleSearch} 
          className='w-75 mx-auto p-2 rounded-top rounded-bottom' />  

          <div className='row'>
              {searchData.map((data,index)=>(
                  <div key={index} className='col-md-3'>
                        <Link href={`/website/clothing/${data._id}`}>
                        <img src={filepath+data.thumbnail} height={300} width={200} alt={data.name} className='w-100' />
                        </Link>
                      

                      <p className='fw-bold'>{data.name}</p>
                      <p>Price: ₹{data.price}</p>

                  </div>
              ))}
            </div>


        </Container>

    </div>
  )
}

export default page