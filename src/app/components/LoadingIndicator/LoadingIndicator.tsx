import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-700"></div>
    </div>
  )
}

export default LoadingIndicator
