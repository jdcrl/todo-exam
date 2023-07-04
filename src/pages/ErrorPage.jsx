import React from 'react'
import { useLocation } from 'react-router-dom';

function ErrorPage() {
    const location = useLocation();
  return (
    <div className='flex flex-col items-center'>
        <span className='text-9xl font-mono'>404</span>
        <span className='text-5xl font-mono'>Error</span>
        <span className='text-3xl font-mono'>Page {location.pathname} does not exist.</span>
    </div>
  )
}

export default ErrorPage
