import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center m-12 w-full space-y-3'>
      <h1 className='text-2xl font-bold'>Not Found.</h1>
      <p className='text-muted-foreground'>The page you are looking does not found. <Link href="/" className='text-secondary-foreground underline'>Go Back</Link></p>
    </div>
  )
}

export default NotFound
