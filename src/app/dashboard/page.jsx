import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
    <div className='p-3 border-gray'>
      <Link href='/dashboard' style={{'textDecoration':'none', 'color':'#5861CC'}}>Home</Link>&nbsp; /&nbsp; Dashboard
    </div>
    <div>
      dashboard page
    </div>
    </div>
  )
}
