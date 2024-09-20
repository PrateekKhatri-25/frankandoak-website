import React from 'react';
import '../color/color.css';
import '../style.css';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Table } from 'react-bootstrap';
import Image from 'next/image';
import men_img from '../../../../public/images/mens_tshirt.webp';
import Link from 'next/link';

const page = () => {
  return (
    <div>
        <div className='p-3 border-gray'>
            <Link href='/dashboard' style={{ 'textDecoration': 'none', 'color': '#5861CC' }}>Home</Link>&nbsp; /&nbsp; Order
        </div>
        <div className='main'>
            <div className='head'>
                Order's List
            </div>
            <Table >
          <thead className='w-100'>
            <tr className='w-100'>
              <th className='p-3'>Delete <input type='checkbox' /></th>
              <th className='p-3'>S.No</th>
              <th className='p-3'>Order Name</th>
              <th className='p-3'>Product Id</th>
              <th className='p-3'>Image</th>
              <th className='p-3'>Description</th>
              <th className='p-3'>Quantity</th>
              <th className='p-3'>Action</th>
              <th className='p-3'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ 'borderBottom': '1px solid #323a49', 'borderTop': '1px solid #323a49', 'margin': '5px' }}>
              <td><input type='checkbox' /></td>
              <td>1.</td>
              <td>Men's</td>
              <td>2</td>
              <td><Image src={men_img} width={50} /></td>
              <td>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </td>
              <td>1</td>
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