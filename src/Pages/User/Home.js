import React, { useEffect, useState } from 'react'
import Header from '../../Components/header'
import { Link, useNavigate } from 'react-router-dom'
import Registraion from '../../Components/User/registraion'
import CreateBoard from '../../Components/Board/CreateBoard'
import { useSelector } from 'react-redux'
import CreateMeeting from '../../Components/Meeting/CreateMeeting'
import Broadcast from '../../Components/Notification/Broadcast'
import Personal from '../../Components/Notification/Personal'

const Home = () => {
  const userData = useSelector(state => state.userData)
  const meetingData = useSelector(state => state.meetingData)
  const allboards = useSelector(state => state.boards)
  const [showForm, setShowForm] = useState(false)
  const [showMeeting, setShowMeeting] = useState(false)
  const [boardForm, setBoardForm] = useState(false)
  const [boardData, setBoardData] = useState([])
  const [meetingState, setMeetingState] = useState([])
  const [selectedTab, setSelectedTab] = useState('boardcast')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleString();

  // for notification - personal and boardcast
  const handleType = (type) => {
    setSelectedTab(type)
  }

  // getting all baords data from redux and updating board data state
  useEffect(() => {
    if (allboards) {
      setBoardData(allboards)
    }
  }, [allboards])


  // getting all meeting data from redux and updating meeting data state
  useEffect(() => {
    if (meetingData) {
      setMeetingState(meetingData)
    }
  }, [meetingData])


   // onchange password update
   const handlePassword = (e) => {
    if (!e.target.value) {
      setError('')
    }
    setPassword(e.target.value)
  }


   // joing meeting when clicking button
   const handleJoin = (id, roomID) => {
    const exactMeeting = meetingData && meetingData?.find((meet) => {
      if (meet.id == id) { return meet }
    })
    const trimmedPassword = password.trim();
    const trimmedMeetingPassword = (exactMeeting?.password || '').trim();
    if (trimmedMeetingPassword) {
      if (trimmedPassword === trimmedMeetingPassword) {
        navigate(`/meeting/${roomID}`, { state: { password } });
      } else {
        setError('Enter correct passcode')
      }
    }
  }
  

  return (
    <div className='flex'>
      <Header />
      <div className='p-7 w-full bg-[#FFFFFF]'>
        <div>
          <h1
            className='text-2xl text-black font-semibold text-left 
          border-b mb-5 pb-3 border-gray-500'
          >
            HOME PAGE
          </h1>
        </div>

        <div
          className='flex flex-row justify-between mb-5 mt-6'
        >
          {userData?.role === 'manager' &&
            <div>
              <button onClick={() => setShowForm(true)}
                className='bg-[#D7CDCC] text-sm border border-black text-center
               text-black px-3 py-1 rounded '
              >
                CREATE USER
                <span className='font-bold text-lg'
                >+
                </span>
              </button>
            </div>
          }
          <div>
            <Link to='/board'>
              <button
                className='bg-[#D7CDCC] text-sm border
               border-black text-center text-black px-3 py-1 rounded '
              >
                VIEW BOARDS
                <span
                  className='font-bold text-lg'>
                  +
                </span>
              </button>
            </Link>
          </div>
          <div>
            <button
              onClick={() => setBoardForm(true)}
              className='bg-[#D7CDCC] text-sm border border-black text-center
             text-black px-3 py-1 rounded '>
              CREATE BOARD
              <span className='font-bold text-lg'>
                +
              </span></button>
          </div>

        </div>

        <div className='flex justify-between'>
          <div
            className='bg-[#b278a5] block w-[50%]  p-2 m-2 rounded-lg'
          >
            <h3
              className='text-center mb-2   text-white font-extrabold text-xl '
            >BOARDS
            </h3>
            {boardData?.slice(0, 3).map((board) => {
              const canViewBoard = board.visibility === 'public' || board.user_id === userData?.id;
              // Render the board only if canViewBoard is true
              return canViewBoard && (
                <div
                  className='bg-white block px-2 py-1 md:h-[10%] my-2 rounded-lg h-[25%]'
                  key={board.id}>
                  <Link to={`/boards/${board.slug}+${board.id}`}
                    className=' capitalize  flex justify-between items-center p-3'>
                    <p
                      className=' font-bold'>{board.name}</p>
                    <p
                      className={`float-right ${board.visibility === 'public' ? 'text-green-400 uppercase font-bold rounded-lg px-2 py-1' :
                        'text-yellow-400 uppercase font-bold rounded-lg px-2 py-1'}`}>
                      {board.visibility}
                    </p>
                  </Link>
                </div>
              );
            })}
            <div
              className='flex justify-center'>
              <Link to='/board'
                className='bg-[#D7CDCC] rounded-lg px-2 py-1'
              >
                View More
              </Link>
            </div>
          </div>
          <div
            className='bg-[#b278a5] w-[50%] m-2 p-3 rounded-lg'>
            <h3
              className='text-center mb-2  font-extrabold text-xl text-white'>MEETINGS</h3>
            <div
              className=' rounded-lg flex justify-center  my-4'>
              <button onClick={() => setShowMeeting(true)}
                className='bg-[#D7CDCC] text-sm border  border-black text-center
                 text-black px-3 py-1 rounded'>
                Create meeting
                <span className='font-bold text-lg'>+
                </span>
              </button>
            </div>
            <div>
              {meetingState && meetingState?.length > 0 && meetingState.slice(0, 2).map((meet) => (
                (
                  <div
                    className='flex justify-around  bg-white p-4 mb-2 rounded-lg'>

                    <div
                      className='block  md:text-sm uppercase'>
                      <h2>{meet.roomID}</h2>
                      <p>Starts: {new Date(meet.starting_time * 1000).toLocaleString()}</p>
                      <p>Starts: {meet.starting_time}</p>
                      <p>Starts: {new Date(meet.expiration_time * 1000).toLocaleString()}</p>
                    </div>

                    <div className='m-auto'>
                    {new Date(formattedDate) >= new Date(meet.starting_time * 1000) ? (
                        <>
                          <input className='rounded-lg border border-x-black px-3 mr-1'
                            placeholder='Enter meeting code'
                            value={password} onChange={handlePassword}
                          />
                          <p className='text-center text-red-500'> {error}</p>
                          <div className='text-center  mt-2'>
                            <button
                              className='bg-[#D7CDCC] px-3 py-1  rounded-lg'

                              onClick={() => handleJoin(meet.id, meet.roomID)} key={meet.id}>
                              join now
                            </button>
                          </div>
                        </>

                      ) : <p className='bg-[#D7CDCC] px-3 py-1 sm:text-xs  rounded-lg'>
                        Not Yet Started</p>

                      }

                    </div>

                    
                  </div>
                )
              ))}
            </div>

            <div className='flex justify-center'>
              <Link to='/meeting'
                className='bg-[#D7CDCC] rounded-lg px-2 py-1' >
                View More
              </Link>
            </div>
          </div>
        </div>
        <div
          className=' mb-5 mt-6 bg-[#b278a5] rounded-xl h-fit p-3'>

          <div
            className='flex text-gray-400 bg-[#1D1E2C] mt-10 p-5 rounded-t-lg'>
            <button onClick={() => handleType('boardcast')}
              className={` rounded-l-lg bg-white px-3 py-2 focus:outline-none ${selectedTab === 'boardcast' ? 'text-black'
                : 'text-red-400'}`}>Braodcast</button>
            <button onClick={() => handleType('personal')}
              className={`rounded-r-lg bg-white  px-3 py-2 focus:outline-none ${selectedTab === 'personal' ? 'text-black'
                : 'text-red-400'}`}>Personal</button>
          </div>

          <div>
            {selectedTab === 'boardcast' && <Broadcast limit={3} />}
            {selectedTab === 'personal' && <Personal limit={3} />}
          </div>

          <div className='flex justify-center'>
            <Link to='/notification'
              className='bg-[#D7CDCC] rounded-lg px-2 py-1' >View More</Link>
          </div>
        </div>

        {showMeeting && <CreateMeeting closeModal={() => setShowMeeting(false)} />}
        {showForm && <Registraion closeModal={() => setShowForm(false)} />}
        {boardForm && <CreateBoard closeModal={() => setBoardForm(false)} />}
      </div>

    </div>
  )
}

export default Home