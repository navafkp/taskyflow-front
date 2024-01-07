import React, { useState } from 'react'
import Header from '../../Components/header'
import Broadcast from '../../Components/Notification/Broadcast'
import Personal from '../../Components/Notification/Personal'

const Notification = () => {
  const [selectedTab, setSelectedTab] = useState('boardcast')

  // notification type
  const handleType = (type) => {
    setSelectedTab(type)
  }

  return (
    <div className='flex'>
      <Header />
      <div className='p-7 w-full bg-[#FFFFFF]  '>
        <div>
          <h1
            className='text-black font-bold text-left text-2xl
           mb-3 pb-3 border-b border-gray-500'
          >
            NOTIFICATION
          </h1>
        </div>
        <div
          className='flex text-gray-400 bg-[#b278a5]  my-10 p-5 rounded-lg'
        >
          <button onClick={() => handleType('boardcast')}
            className={`rounded-l-lg bg-white px-3 py-2 focus:outline-none ${selectedTab === 'boardcast' ? 'text-black'
              : 'text-red-400'}`}>Braodcast</button>
          <button onClick={() => handleType('personal')}
            className={`rounded-r-lg bg-white  px-3 py-2 focus:outline-none ${selectedTab === 'personal' ? 'text-black'
              : 'text-red-400'}`}>Personal</button>
        </div>

        <div>
          {selectedTab === 'boardcast' && <Broadcast />}
          {selectedTab === 'personal' && <Personal />}
        </div>
      </div>

    </div >
  )
}

export default Notification