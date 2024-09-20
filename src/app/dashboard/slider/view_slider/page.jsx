import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import '../../color/color.css'
import '../../style.css'
import slider_img from '../../../../../public/images/slider_img.webp'
import { Table } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'

const page = () => {
  return (
    <div>
    <div className='p-3 border-gray'>
    <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Slider View
    </div>
        
        <div className='main'>
            <div className='head'>
                View Slider
            </div>
            <Table >
          <thead className='w-100'>
            <tr className='w-100'>
              <th className='p-3'>Delete <input type='checkbox' /></th>
              <th className='p-3'>S.No</th>
              <th className='p-3'>Slider Name</th>
              <th className='p-3'>Heading</th>
              <th className='p-3'>Sub Heading</th>
              <th className='p-3'>Image</th>
              <th className='p-3'>Action</th>
              <th className='p-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
              <td><input type='checkbox' /></td>
              <td>1.</td>
              <td>Man Image</td>
              <td>New summer must-haves just dropped.</td>
              <td> free shipping on orders over $79</td>
              <td><Image src={slider_img} width={150}/> </td>
              <td>
                <MdDelete className='text-danger' /> | <FaRegEdit className='cursor-pointer text-warning' />
              </td>
              <td>Display</td>
            </tr>
          </tbody>
        </Table>
        </div>
    </div>
  )
}

export default page