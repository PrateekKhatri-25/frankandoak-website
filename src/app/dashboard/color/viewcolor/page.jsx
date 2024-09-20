'use client'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from "react-icons/fa";
import '../../color/color.css';
import '../../style.css';
import Link from 'next/link';
import axios from 'axios';
import Loader from '../../dash_common/Loader';


const page = () => {
    const [color, setColor] = useState([]);

    const fetchColor = async () => {
        try {
            const response = await axios.
                get('http://localhost:5200/api/admin-panel/color/read-color');
            if (response.status !== 200) return alert('something wrong');
            // console.log(response.data.data);
            setColor(response.data.data);
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    };

    useEffect(() => { fetchColor() }, []);

    const handleDelete = async (_id) => {
        if (!window.confirm('want to delete color?')) return
        try {
            const response = await axios.
                delete(`http://localhost:5200/api/admin-panel/color/delete-color/${_id}`);
            if (response.status !== 200) return alert('something wrong');
            const indexNo = color.findIndex((colors) => colors._id === _id);
            const newData = [...color];
            newData.splice(indexNo, 1);
            setColor(newData);
            alert('color deleted')
        }
        catch (error) {
            console.log(error);
            alert('something went')
        }
    }

    const handleStatus = async (e) => {
        const newValue = (e.target.textContent === 'Active') ? false : true
        try {
            const response = await axios.
                put(`http://localhost:5200/api/admin-panel/color/update-color-status/${e.target.value}`, { newValue });

            if (response.status !== 200) return alert('something wrong');

            const indexNo = color.findIndex((colors) => colors._id === e.target.value);

            const newData = [...color];

            newData[indexNo].status = newValue;

            setColor(newData);
            
            alert('status updated')
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }

    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; View Color
            </div>
            <div className='main'>
                <div className='head'>
                    View Color
                </div>
                <Table >
                    <thead className='w-100'>
                        <tr className='w-100'>
                            <th className='p-3 w-25'>Delete <input type='checkbox' /></th>
                            <th className='p-3 w-25'>S.No</th>
                            <th className='p-3 w-25'>Color Name</th>
                            <th className='p-3 w-25'>Color Code</th>
                            <th className='p-3 w-25'>Action</th>
                            <th className='p-3 w-25'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            color.length === 0 ?
                                <tr className='w-100'>
                                    <td colSpan='6' className='text-center'><Loader /></td>
                                </tr>
                                :
                                color.map((item, index) => {
                                    return (
                                        <tr key={index} style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
                                            <td><input type='checkbox' /></td>
                                            <td>{index + 1}</td>
                                            <td>{item.colorName}</td>
                                            <td>
                                                {item.colorcode}
                                                <span style={{
                                                    backgroundColor: item.colorcode,
                                                    padding: '0px 20px',
                                                    margin: '10px',
                                                    border: '1.5px solid'
                                                }}></span>
                                            </td>
                                            <td>
                                                <MdDelete className='text-danger cursor-pointer' onClick={() => handleDelete(item._id)} /> |
                                                 <Link href={`/dashboard/color/update-color/${item._id}`}> <FaRegEdit className='cursor-pointer text-warning' /></Link>
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