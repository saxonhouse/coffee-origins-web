import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners';

export const Loading = ({color, loading}) => {
  return (
    <div className='loading'>
      <ClipLoader
        className='loading-spinner'
        size={50}
        color={color}
        loading={loading}
      />
    </div>
  )
}
