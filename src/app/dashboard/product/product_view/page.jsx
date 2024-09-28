'use client'
import React, { use, useEffect, useState } from 'react';
import '../../color/color.css';
import '../../style.css';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Modal, Table } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import Loader from '../../dash_common/Loader';
import Swal from 'sweetalert2';
// import { setupDevBundler } from 'next/dist/server/lib/router-utils/setup-dev-bundler';

const page = () => {
  const [product, setProduct] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [modal, setModal] = useState(false);


  const fetchProduct = async () => {
    try {
      const response = await axios.
        get(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/read-product`);

      if (response.status !== 200) return alert('something wrong');

      setProduct(response.data.data);
      setFilePath(response.data.file_path);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  };

  useEffect(() => { fetchProduct(); }, []);

  const handleDelete = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            axios.
              delete(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/delete-product/${_id}`)
              .then((response) => {
                if (response.status !== 200) return alert('something wrong');

                const indexNo = product.findIndex((product) => product._id == _id);

                const newData = [...product];

                newData.splice(indexNo, 1);

                setProduct(newData);

                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              })
              .catch((error) => {
                console.log(error);
                alert('something went wrong')
              })
          }
          catch (error) {
            console.log(error);
            alert('something went wrong')

          }
        }
      })
  };

  const [modalData, setModalData] = useState({})

  let myModal = (item) => {
    console.log(item);
    setModalData(item);
    setModal(!modal);
  }

  const handleStatus = async (e) => {
    const newValue = (e.target.textContent === 'Active') ? false : true
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Status Updated successfully",
      showConfirmButton: false,
      timer: 1500
    })
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     try {
      //       axios.
      //         put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/update-product-status/${e.target.value}`, { newValue })
      //         .then((response) => {
      //           if (response.status !== 200) return alert('something wrong')

      //           const indexNO = product.findIndex((item) => item._id === e.target.value);

      //           const newData = [...product];

      //           product[indexNO].status = newValue;

      //           setProduct(newData);
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //           alert('something went wrong')
      //         })
      //     }
      //     catch (error) {
      //       console.log(error);
      //       alert('something went wrong')
      //     }
      // }
      // })
    try {
      const response = await axios.
        put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/update-product-status/${e.target.value}`, { newValue });

      if (response.status !== 200){
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
         return 
        }

      // alert('status updated');

      const indexNO = product.findIndex((item) => item._id === e.target.value);

      const newData = [...product];

      product[indexNO].status = newValue;

      setProduct(newData);
    }
    catch (error) {
      console.log(error);
      // alert('something went wrong')
      Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      });
    }
  };
  // console.log(product,filePath);

  return (
    <div className={modal ? 'background-change' : ''}>
      <div className='p-3 border-gray'>
        <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; View Product
      </div>
      <div className='main'>
        <div className='head'>
          Product View
        </div>
        <Table className={modal ? 'bg-black' : ''}>
          <thead className='w-100'>
            <tr className='w-100'>
              <th className='p-3'>Delete <input type='checkbox' /></th>
              <th className='p-3'>S.No</th>
              <th className='p-3'>Category Name</th>
              <th className='p-3'>Thumbnail</th>
              <th className='p-3'>Description</th>
              <th className='p-3'>Action</th>
              <th className='p-3'>Status</th>
            </tr>
          </thead>
          <tbody>

            {
              product.length === 0 ?
                <tr>
                  <td colSpan='7' className='text-center'><Loader /></td>
                </tr>
                :
                product.map((item, index) => {
                  return (

                    <tr style={{
                      'borderBottom': '1px solid #323a49',
                      'borderTop': '1px solid #323a49',
                      'margin': '5px'
                    }}>
                      <td><input type='checkbox' /></td>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td><img
                        className='cursor-pointer'
                        src={filePath + item.thumbnail}
                        height={50}
                        width={50}
                        onClick={() => myModal(item)}
                      />
                        <div className={modal ? '' : 'd-none'}>
                          <Model close={setModal} Data={modalData} filePath={filePath} />
                        </div>

                      </td>
                      <td>
                        <ViewDescription data={item} id={index} />
                      </td>
                      <td>
                        <MdDelete
                          className='text-danger cursor-pointer'
                          onClick={() => handleDelete(item._id)}
                        />
                        |
                        <Link href={`/dashboard/product/update-product/${item._id}`}><FaRegEdit
                          className='cursor-pointer text-warning' /></Link>
                      </td>
                      <td>
                        <button
                          value={item._id}
                          onClick={handleStatus}
                          className={`btn-every text-white ${(item.status) ? 'bg-success' : 'bg-danger'} rounded-3`}>
                          {(item.status) ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                    </tr>

                  )
                })
            }


          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default page


const Model = ({ Data, close, filePath }) => {
  // console.log(Data, filePath);


  return (
    <div>
      <div className={'product-modal'}>
        <div>
          <span className='close-btn' onClick={() => close(false)}>X</span>
        </div>

        <div>
          <p className='fs-3 text-center'><b>Product Detail</b></p>
          <p>Hover Thumbnail Image</p>
          <img
            src={filePath + Data?.hover_thumbnail}
            height={100}
            width={100}
          />
        </div>

        <br /><p>Images</p>
        <div className='d-flex gap-2 '>

          {
            Data?.images?.map((image) => {

              return (
                <img
                  src={filePath + image}
                  height={100}
                  width={100}
                />
              )
            })
          }
        </div>
        <p>Colors Available:{Data?.color?.map((colors) => {
          return (
            <p className='color w-50'>{colors.colorName} &nbsp;
              <span className='border border-black rounded-circle py-1 px-2'
                style={{ backgroundColor: colors.colorcode }}></span></p>
          )
        })}</p>

        <p>
          Sizes Available:{Data?.size?.map((sizes) => {
            return (
              <p className='size d-inline mx-2'>{sizes.size_name}</p>
            )
          })}
        </p>

        <p>Actual Price: {Data.MRP}rs</p>
        <p>Sale Price: {Data.price}rs</p>
        <p>Discount: {(Data.MRP) - (Data.price)}rs</p>
        <p>Brand: {Data.brand}</p>
      </div>
    </div>
  )
}

function ViewDescription({ data, index }) {
  // console.log(data);
  const [discription, setDiscrption] = useState(false)
  return (
    <div>
      {
        discription ?
          <span>
            {data.description}
            <Link href='' onClick={() => setDiscrption(!discription)}> read less</Link>
          </span>
          :
          <span>
            {data.description.substring(0, 50)}...
            <Link href='' onClick={() => setDiscrption(!discription)}> read more</Link>
          </span>
      }
    </div>
  )
}