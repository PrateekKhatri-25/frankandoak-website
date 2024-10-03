import React from 'react'
import './cancel.css'
import { RxCross2 } from "react-icons/rx";


const page = () => {
  return (
    <div>
      <div class="row justify-content-center mx-2">
        <div class="col-md-5">
          <div class="message-box _success _failed">
            <center>
              <div className='bg-danger  border border-0 rounded-circle' style={{
                width: '30px',
                
              }}>
                <RxCross2 className='text-white fs-3' style={{margin:'0 2px'}} />
              </div>
            </center>
            <h2> Your payment failed </h2>
            <p>  Try again later </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default page