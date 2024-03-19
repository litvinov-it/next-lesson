'use client';

import React from 'react'
import Error from 'next/error'

interface Props{
    error: Error,
    reset: () => void
}

const ErrorPage = ({error, reset}: Props) => {
    console.log(error)
  return (
    <>
    <div>Error</div>

    <button
    onClick={() => reset()} 
    className='btn btn-primary'>Retry</button>
    </>
  )
}

export default ErrorPage