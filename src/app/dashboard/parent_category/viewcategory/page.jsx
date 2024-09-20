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
    // const []
    const [parentCats, setParentCats] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [ifAllChecked, setIfAllChecked] = useState(false);

    const fetchParentCatogries = async () => {
        try {
            const response = await axios.
                get('http://localhost:5200/api/admin-panel/parent-category/read-parent-category')
            if (response.status !== 200) return alert('something wrong')
            setParentCats(response.data.data)
            console.log(parentCats);
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    useEffect(() => {
        fetchParentCatogries();
    }, [setParentCats])

    const handleStatus = async (e) => {
        console.log(e.target.value);
        const newValue = (e.target.textContent === 'Active') ? false : true
        try {
            const response = await axios.
                put(`http://localhost:5200/api/admin-panel/parent-category/update-parent-category-status/${e.target.value}`, { newValue });

            if (response.status !== 200) return alert('something wrong')
            alert('status updated')
            const indexNo = parentCats.findIndex((parentCat) => parentCat._id === e.target.value)
            const newData = [...parentCats]
            parentCats[indexNo].status = newValue
            setParentCats(newData)

        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    const handleCheckInput = async (e) => {
        const { checked, value } = e.target;
        if (checked) {
            const newArr = [...selectedId];
            newArr.push(value);
            setSelectedId(newArr);
        }
        else {
            const newArr = [selectedId].filter((id) => id !== value);
            setSelectedId(newArr);
        }
    }

    const handleDeleteCheck = async () => {
        console.log(selectedId);
    }

    const handleSelectAll = (e) => {

        if (e.target.checked) {
            const allIds = parentCats.map((category) => category._id);
            setSelectedId(allIds);
            setIfAllChecked(true)
        }
        else {
            setSelectedId([])
            setIfAllChecked(false)

        }
        // console.log(allIds);
    }
    useEffect(() => {
        setIfAllChecked(selectedId.length === parentCats.length)
    }, [selectedId, parentCats])

    const handleDelete = async (_id) => {
        if (!window.confirm('Are you sure you want to delete this category')) return

        try {
            const response = await axios.delete(`http://localhost:5200/api/admin-panel/parent-category/delete-parent-category/${_id}`);
            if (response.status !== 200) return alert('something wrong');
            alert('deleted');
            const indexNo = parentCats.findIndex((parentCat) => parentCat._id === _id);
            const newData = [...parentCats];
            newData.splice(indexNo, 1);
            setParentCats(newData);
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
                            <th className='p-3'>
                                <button
                                    className='btn-every bg-danger text-white px-2 rounded-3 me-3'
                                    onClick={handleDeleteCheck}
                                >Delete</button>
                                <input
                                    type='checkbox'
                                    name='deleteAll'
                                    onClick={handleSelectAll}
                                    checked={ifAllChecked}
                                /></th>
                            <th className='p-3'>S.No</th>
                            <th className='p-3'>Category Name</th>
                            <th className='p-3'>Description</th>
                            <th className='p-3'>Action</th>
                            <th className='p-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parentCats.length === 0 ?
                                <tr>
                                    <td colSpan='6' className='text-center'>
                                        <Loader />
                                    </td>
                                </tr>
                                :
                                parentCats.map((parentCategory, index) => {
                                    return (
                                        <tr style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
                                            <td><input
                                                type='checkbox'
                                                name='delete'
                                                id='delete1'
                                                value={parentCategory._id}
                                                onClick={handleCheckInput}
                                                checked={selectedId.includes(parentCategory._id)}
                                            /></td>
                                            <td>{index + 1}</td>
                                            <td>{parentCategory.name}</td>
                                            <td>
                                                {parentCategory.description}
                                            </td>
                                            <td>
                                                <MdDelete
                                                    className='text-danger cursor-pointer'
                                                    onClick={() => handleDelete(parentCategory._id)}
                                                />
                                                |
                                                <Link href={`/dashboard/parent_category/update-category/${parentCategory._id}`}>
                                                    <FaRegEdit
                                                        className='cursor-pointer text-warning' /> </Link>
                                            </td>
                                            <td>
                                                <button
                                                    value={parentCategory._id}
                                                    onClick={handleStatus}
                                                    className={`btn-every text-white ${(parentCategory.status) ? 'bg-success' : 'bg-danger'} rounded-3`}>
                                                    {(parentCategory.status) ? 'Active' : 'Inactive'}
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