'use client'
import React, { use, useEffect, useState } from 'react';
import '../../color/color.css';
import '../../style.css';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import Loader from '../../dash_common/Loader';

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
    try {
      const response = await axios.
        delete(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/delete-product/${_id}`);

      if (response.status !== 200) return alert('something wrong');

      const indexNo = product.findIndex((product) => product._id == _id);

      const newData = [...product];

      newData.splice(indexNo, 1);

      setProduct(newData);

      alert('product deleted');
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
    }
  };

  const handleStatus = async (e) => {
    const newValue = (e.target.textContent === 'Active') ? false : true
    try {
      const response = await axios.
        put(`${process.env.NEXT_PUBLIC_HOST_NAME}api/admin-panel/product/update-product-status/${e.target.value}`, { newValue });

      if (response.status !== 200) return alert('something wrong')

      alert('status updated');

      const indexNO = product.findIndex((item) => item._id === e.target.value);

      const newData = [...product];

      product[indexNO].status = newValue;

      setProduct(newData);
    }
    catch (error) {
      console.log(error);
      alert('something went wrong')
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
                  console.log(item)
                  {/* const gallery=item.images.map((image)=>image)
                  console.log(gallery) */}
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
                        onClick={() => setModal(!modal)}
                      />
                        <div className={modal ? 'product-modal' : 'd-none'}>

                          <div>
                            <span className='close-btn' onClick={() => setModal(false)}>X</span>
                          </div>

                          <div>
                            <p className='fs-3 text-center'><b>Product Detail</b></p>
                            <p>Hover Thumbnail</p>
                            <img
                              src={filePath + item.hover_thumbnail}
                              height={100}
                              width={100}
                            />
                          </div>

                          <br /><p>Images</p>
                          <div className='d-flex gap-2 '>

                            {
                              item.images.map((image) => {
                                {/* console.log(image) */ }
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
                          <p>Colors Available:{item.color.map((colors) => {
                            {/* console.log(colors.colorName) */ }
                            return (
                              <p className='color w-50'>{colors.colorName} &nbsp;
                                <span className='border border-black rounded-circle py-1 px-2'
                                  style={{ backgroundColor: colors.colorcode }}></span></p>
                            )
                          })}</p>

                          <p>
                            Sizes Available:{item.size.map((sizes) => {
                              {/* console.log(sizes.size_name) */ }
                              return (
                                <p className='size d-inline mx-2'>{sizes.size_name}</p>
                              )
                            })}
                          </p>

                          <p>Actual Price: {item.MRP}rs</p>
                          <p>Sale Price: {item.price}rs</p>
                          <p>Discount: {(item.MRP) - (item.price)}rs</p>
                          <p>Brand: {item.brand}</p>
                        </div>
                      </td>
                      <td>
                        {
                          item.description
                        }
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