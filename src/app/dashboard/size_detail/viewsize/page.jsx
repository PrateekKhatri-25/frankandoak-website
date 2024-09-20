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
    const [size, setSize] = useState([]);
    const fetchSize = async () => {
        try {
            const response = await axios.
                get('http://localhost:5200/api/admin-panel/size/read-size')
            if (response.status !== 200) return alert('something wrong')
            setSize(response.data.data)
        }
        catch (error) {
            console.log(error);
            alert('something went wrong')
        }
    }
    useEffect(() => {
        fetchSize()
    }, [setSize]);

    const handleStatus=async(e)=>{
        const id=(e.target.value);
        const newValue=(e.target.textContent==='Active')?false:true
        try{
            const response=await axios.
            put(`http://localhost:5200/api/admin-panel/size/update-size-status/${e.target.value}`,{newValue})

            if(response.status!==200) return alert('something wrong');
            const indexNo=size.findIndex((sizeStatus)=>sizeStatus._id===e.target.value);
            const newData=[...size];
            newData[indexNo].status=newValue;
            setSize(newData);
        }
        catch(error){
            console.log(error);
            alert('something went wrong')
        }
    }

    const handleDelete=async (_id)=>{
        if (!window.confirm('Are you sure you want to delete this size')) return
        try{
            const response= await axios.delete(`http://localhost:5200/api/admin-panel/size/delete-size/${_id}`);
            if(response.status!==200) return alert('something wrong');
            alert('category deleted');

            const indexNo=size.findIndex((sizeStatus)=>sizeStatus._id===_id);
            const newData=[...size]
            newData.splice(indexNo,1)
            setSize(newData);
            
        }
        catch(error){
            console.log(error);
            alert('something went wrong')
        }
    }
    return (
        <div>
            <div className='p-3 border-gray'>
                <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; View Size
            </div>
            <div className='main'>
                <div className='head'>
                    View Size
                </div>
                <Table >
                    <thead className='w-100'>
                        <tr className='w-100'>
                            <th className='p-3 w-25'>Delete <input type='checkbox' /></th>
                            <th className='p-3 w-25'>S.No</th>
                            <th className='p-3 w-25'>Size Name</th>
                            <th className='p-3 w-25'>Action</th>
                            <th className='p-3 w-25'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            size.length===0
                            ?
                            <tr>
                                <td colSpan='6' className='text-center'><Loader/></td>
                            </tr>
                            :
                            size.map((item, index) => {
                                return (
                                    <tr style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
                                        <td><input type='checkbox' /></td>
                                        <td>{index + 1}</td>
                                        <td>{item.size_name}</td>
                                        <td>
                                            <MdDelete 
                                            className='text-danger'
                                            onClick={()=>handleDelete(item._id)} />
                                             |
                                              <Link href={`/dashboard/size_detail/update-size/${item._id}`}>
                                               <FaRegEdit 
                                               className='cursor-pointer text-warning' /></Link>
                                        </td>
                                        <td>
                                        <button 
                                        value={item._id}
                                        onClick={handleStatus}
                                        className={`btn-every rounded-3 text-white ${(item.status)?'bg-success':'bg-danger'}`}>
                                            {(item.status)?'Active':'Inactive'}
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