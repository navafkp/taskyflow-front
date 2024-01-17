import React, { useState } from 'react'
import { createMeetAxios } from '../../Server/Meeting/CreateMeet'
import { useDispatch, useSelector } from 'react-redux'
import { updateMeetingData } from '../../Store/MeetingSlice'

const CreateMeeting = ({ closeModal }) => {
    const access = useSelector(state => state.usertoken.access)
    const { workspace, id } = useSelector(state => state.userData)
    const [roomID, setRoomID] = useState()
    const [description, setDescription] = useState()
    const [startingtime, setStartingtime] = useState()
    const [duration, setDuration] = useState()
    const [dateTime, setDateTime] = useState()
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    // setting starting time
    const handleStartingTime = (e) => {
        const time = e.target.value + ":00"
        setDateTime(time)
        const timestamp = new Date(time).getTime() / 1000;
        setStartingtime(timestamp)
    }

    // meeting creation
    const handleMeetingCreation = (e) => {
        e.preventDefault()
        const timestamp = new Date().getTime() / 1000;
        if (timestamp >= startingtime) {
            setError('Cannot create a meeting for backed date')
        }
        else {
            if (roomID && description && startingtime && duration && password) {
                createMeetAxios(access, id, workspace, roomID, description, startingtime, duration, password)
                    .then((response) => {
                        dispatch(updateMeetingData(response))
                        closeModal()
                    })
                    .catch((error) => {
                        setError('Error creating the meeting: ' + error.message);
                    });
            } else {
                setError('Please fill all details')
            }
        }
    }

    return (
        <div>
            <div className=' absolute !w-[100%]  bg-app-bg rounded-lg'>
                <div className='overlay '>
                    <div className='modal-content '>
                        <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] 
                        h-[20px] flex justify-center items-center mt-4 rounded-full'
                            onClick={closeModal}>
                            x
                        </button>
                        <h3 className='uppercase mb-2 font-bold text-center text-'>Create Meeting</h3>
                        <form>
                            <div className="mb-2">
                                <input
                                    required value={roomID} onChange={(e) => setRoomID(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3
                                     text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="room name"
                                    type="text"
                                    placeholder="room name"
                                />
                            </div>
                            <div className="mb-2">
                                <input required
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3
                                     text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="description"
                                    type="text" placeholder="what is all about"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    value={dateTime}
                                    onChange={handleStartingTime}
                                    className="shadow appearance-none border rounded w-full py-2 px-3
                                     text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                    id="datetime"
                                    type="datetime-local"
                                    placeholder="Date and Time"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    value={duration} onChange={(e) => {
                                        const inputValue = e.target.value
                                        const newValue  = inputValue < 0 ? 1 :inputValue;
                                        setDuration(newValue)
                                    }}
                                    className="shadow appearance-none border rounded w-full py-2 px-3
                                     text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                    id="duration"
                                    type="number" placeholder="duration in minutes"
                                />
                            </div>

                            <div className="mb-2">
                                <input
                                    value={password} required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none focus:shadow-outline  mt-2" id="duration"
                                    type="text" placeholder="password"
                                />
                            </div>



                            <button
                                onClick={handleMeetingCreation} className='bg-[#b278a5] text-white rounded  w-full px-2 py-1'>
                                CREATE MEETING
                            </button>
                            <p className='text-center'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateMeeting