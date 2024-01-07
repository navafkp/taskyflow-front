import React, { useEffect, useState } from 'react'
import Header from '../../Components/header'
import { useNavigate } from 'react-router-dom'
import CreateMeeting from '../../Components/Meeting/CreateMeeting'
import { useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import DeletePopUp from '../../Components/DeletePopUp'


const Meeting = () => {
  const access = useSelector(state => state.usertoken.access)
  const userData = useSelector(state => state.userData)
  const meetingData = useSelector(state => state.meetingData)
  const [meetingState, setMeetingState] = useState([])
  const [showform, setShowform] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleString();


  // setting MeetingState from redux store - meeting data
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
            className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3
           border-gray-500'>
            Meeting
          </h1>
        </div>

        {userData?.role === 'manager' && (
          <div className='w-[50%] md:w-[100%] 
          flex align-middle  px-2 py-2'
          >
            <div
              className='w-[60%] h-[30%] rounded-lg items-center  p-2'
            >
              <button onClick={() => setShowform(true)}
                className='bg-[#D7CDCC] text-sm border md:text-xs
                 border-black text-center
                 text-black px-3 py-1 rounded'>
                Create meeting
                <span className='font-bold text-lg'>+
                </span>
              </button>
            </div>
          </div>
        )}

        <div
          className='flex flex-row justify-between mb-5 mt-2'
        >


          <div
            className='w-full  px-2 py-4'
          >
            <div
              className='w-[100%] rounded-lg bg-[#b278a5] p-4'
            >
              <p className='text-white p-2'> Meetings</p>
              {meetingState && meetingState?.length > 0 && meetingState.map((meet) => (
                (
                  <div
                    className='flex justify-around  bg-white p-4 mb-2 rounded-lg'
                  >
                    <div className='block  '>
                      <h2
                        className='uppercase font-semibold mb-2'
                      >
                        {meet.roomID}
                      </h2>
                      <p>Starts: {new Date(meet.starting_time * 1000).toLocaleString()}</p>
                      <p>Ends: {new Date(meet.expiration_time * 1000).toLocaleString()}</p>


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

                    {userData?.role === 'manager' &&

                      <div className='pt-1 m-auto'>

                        <button>
                          <MdDelete onClick={(e) => setShowModal(true)} color='firebrick' size={'35px'} />
                        </button>
                        {showModal &&
                          <DeletePopUp type={'meeting'} access={access} id={meet.id}
                            closeModal={() => setShowModal(false)} />
                        }
                      </div>
                    }

                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {showform && <CreateMeeting closeModal={() => setShowform(false)} />}
      </div>

    </div>
  )
}

export default Meeting