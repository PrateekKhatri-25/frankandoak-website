'use client'
import React, { useEffect, useState } from 'react';
import '../../color/color.css';
import '../../style.css';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Image from 'next/image';
import men_img from '../../../../../public/images/mens_tshirt.webp';
import Link from 'next/link';
import axios from 'axios';
import Loader from '../../dash_common/Loader';

const page = () => {
    const [productCat, setProductCat] = useState([]);
    const [filepath, setFilepath] = useState('');

    // console.log(productCat)
    const fetchProductCat = async () => {
        try {
            const response = await axios.
                get('http://localhost:5200/api/admin-panel/product-category/read-product-category');
            if (response.status !== 200) return alert('something wrong');
            // setProductCat(response.data.data);

            setProductCat(response.data.data);
            // const filepath = response.data.file_path;
            // setProductCat([...productCat,filepath])
            setFilepath(response.data.file_path);
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }


    useEffect(() => { fetchProductCat() }, []);

    const handleDelete = async (_id) => {
        if (!window.confirm('want to delete product Category')) return
        try {
            const response = await axios.
                delete(`http://localhost:5200/api/admin-panel/product-category/delete-product-category/${_id}`);
            if (response.status !== 200) return alert('something wrong');
            const indexNo = productCat.findIndex((category) => category._id == _id);
            const newDate = [...productCat];
            newDate.splice(indexNo, 1);
            setProductCat(newDate);
            alert('product category deleted');
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
                put(`http://localhost:5200/api/admin-panel/product-category/update-product-category-status/${e.target.value}`, { newValue });

            if (response.status !== 200) return alert('something wrong');

            const indexNo = productCat.findIndex((category) => category._id == e.target.value);
            
            const newData = [...productCat];

            newData[indexNo].status = newValue;

            setProductCat(newData);
            
            alert('status updated');
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; View Category
            </div>
            <div className='main'>
                <div className='head'>
                    View Product Category
                </div>
                <Table >
                    <thead className='w-100'>
                        <tr className='w-100'>
                            <th className='p-3'>Delete <input type='checkbox' /></th>
                            <th className='p-3'>S.No</th>
                            <th className='p-3'>Category Name</th>
                            <th className='p-3'>Parent Category</th>
                            <th className='p-3'>Image</th>
                            <th className='p-3'>Description</th>
                            <th className='p-3'>Action</th>
                            <th className='p-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productCat.length === 0 ?
                                <tr>
                                    <td colSpan='7' className='text-center'>
                                        <Loader />
                                    </td>
                                </tr>
                                :
                                productCat.map((cat, index) => {

                                    return (
                                        <tr key={cat._id} style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
                                            <td><input type='checkbox' /></td>
                                            <td>{index + 1}</td>
                                            <td>{cat.name}</td>
                                            <td>{cat.parent_category?.name}</td>
                                            <td><img
                                                src={filepath  + cat.thumbnail}
                                                width={50}
                                                height={50}
                                                alt={cat.name}
                                            /></td>
                                            <td>
                                                {cat.description}
                                            </td>
                                            <td>
                                                <MdDelete className='text-danger cursor-pointer' onClick={() => handleDelete(cat._id)} />
                                                |
                                                <Link href={`/dashboard/product_category/update-product/${cat._id}`}><FaRegEdit className='cursor-pointer text-warning ' /></Link>
                                            </td>
                                            <button
                                                    value={cat._id}
                                                    onClick={handleStatus}
                                                    className={`btn-every text-white my-3 ${(cat.status) ? 'bg-success' : 'bg-danger'} rounded-3`}>
                                                    {(cat.status) ? 'Active' : 'Inactive'}
                                                </button>
                                            {/* <td>{cat.status}</td> */}
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