import React, { useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 } from "uuid"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const ZvideoRoom = () => {
    const userData = useSelector(state => state.userData)
    const meetingData = useSelector(state => state.meetingData)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { roomID } = useParams()
    const location = useLocation()

    // zego credentials
    const appID = parseInt(process.env.REACT_APP_ZEO_APP_ID);
    const serverSecret = process.env.REACT_APP_ZEO_SERVER_SECRET
    const receivedPassword = location.state?.password;
    console.log(appID, serverSecret)


    // creating meeting
    const meetingUI = async (element) => {
        if (meetingData) {
            const exactMeeting = meetingData && meetingData?.find((meet) => {
                if (meet.roomID == roomID) { return meet }
            })
            if (exactMeeting?.password) {
                const arrivedPassword = receivedPassword?.trim();
                const trimmedMeetingPassword = (exactMeeting?.password || '').trim();
                if (arrivedPassword == trimmedMeetingPassword) {
                    if (userData) {
                        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                            appID,
                            serverSecret,
                            roomID,
                            v4(),
                            userData?.name,

                        );

                        try {
                            const zp = ZegoUIKitPrebuilt.create(kitToken);
                            zp.joinRoom({
                                container: element,
                                sharedLinks: [
                                    {
                                        'name': 'Copy Link',
                                        'url': `http://localhost:3000/meeting/${roomID}`,
                                    }
                                ],
                                scenario: {
                                    mode: ZegoUIKitPrebuilt.VideoConference,
                                },
                                onLeaveRoom: (user) => {
                                    navigate('/meeting')
                                },
                            })

                        } catch (error) {
                            console.error('Error joining room:', error);
                        }
                    }
                } else {
                    setError('Unauthorized Access')
                }
            } else {
                setError('Unauthorized Access')
            }
        }
    }

    return (
        <div
            className='bg-slate-800  w-full h-screen'
        >
            <div
                ref={meetingUI}
            >

            </div>
            <h3
                className=' uppercase text-center p-4 text-white'
            >
                {error}
            </h3>
        </div>
    )
}

export default ZvideoRoom