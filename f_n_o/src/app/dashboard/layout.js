'use client'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Dashleft from './dash_common/Dashleft'
import Header from './dash_common/Header'
import './style.css'

export default function layout({children}) {
  return (
    <Row className='m-0 bg-color'>
        <Col xl={2} className='p-0  border-gray'><Dashleft/> </Col>
        <Col xl={10} className='p-0'>
        <Header className='border-gray'/>
         {children} 
         </Col>
    </Row>
  )
}
