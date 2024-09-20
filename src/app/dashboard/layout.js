'use client'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Dashleft from './dash_common/Dashleft'
import Header from './dash_common/Header'
import './style.css'

export default function layout({children}) {
  return (
    <div className=' d-flex m-0 bg-color'>
        <div className='p-0 w-25 '><Dashleft/> </div>
        <div className='p-0 w-75'>
        <div>
        <Header className='border-gray'/>
         {children} 
         </div>
         </div>
    </div>
  )
}
