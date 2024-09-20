import React from 'react'
import Header from '../common_components/Header'
import Footer from '../common_components/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import './wishlist.css'
import second_slider_img1 from '../../../public/images/second_slider_img1.jpg'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa6'
import { IoHeartOutline } from 'react-icons/io5'

const page = () => {
  return (
    <div>
      <Header />
      <Container className='my-4 index-z'>
        <Row>
          <Col xl={3}>
            <div className='bg-color my-3'>
              <ul className='ul-wishlist'>
                <li>Orders & returns</li>
                <li>Address book</li>
                <li>Account settings</li>
                <li>Wishlist <IoHeartOutline /></li>
                <li>Frank Rewards</li>
                <li>Refer a Friend</li>
              </ul>
            </div>
          </Col>
          <Col xl={9}>
            <h2 className='my-3'>Wishlist</h2>
            <div className='grid-wishlist'>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>

              <div className="card border-0 index-z" style={{ width: '200px' }}>
                <Image src={second_slider_img1} className="card-img-top cursor-pointer" width={200} alt="" />
                <div className='btn-position'>Quick Add</div>
                <div className='wishlist-position'>-66%</div>
                <div className="card-body p-0 py-2">
                  <div className="card-title fw-bold d-flex">
                    <div className='fs-12'>The Slim Hemp T-Shirt in Twilight Mauve</div>
                    <FaHeart className='fs-5' />
                  </div>
                  <p className="card-text fs-12 py-2"> <del>$59.50</del> <span className='text-danger'>$20.00</span> </p>
                  <p className='fs-12 color-color'>1 color</p>
                </div>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default page