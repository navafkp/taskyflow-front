import React from 'react'

const Loading = () => {
  
  return (

    <div
      className="bg-black/50 z-20 absolute w-full top-0 left-0 h-full text-amber-100 "
    >
      <div
        className="flex items-center justify-center h-full"
      >
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 "
        >

        </div>
      </div>
    </div>

  )
}

export default Loading