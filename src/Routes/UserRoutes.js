import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'
import Users from '../Pages/User/Users'
import Notification from '../Pages/User/Notification'
import Kanban from '../Pages/Task/Kanban'
import Boards from '../Pages/Task/Boards'
import Meeting from '../Pages/Meeting/Meeting'
import CreateMeeting from '../Components/Meeting/CreateMeeting'
import ZvideoRoom from '../Pages/Meeting/ZvideoRoom'
import Home from '../Pages/User/Home'
import NotFound from '../Components/NotFound'

// user routes
const UserRoutes = ({ role }) => {
    return (
        <Routes>
            <Route path='/dashboard'  element={<Home />} />
            <Route path='/profile' exact element={<UserProfile />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/board' element={<Boards />} />
            <Route path='/boards/:board' element={<Kanban />} />
            <Route path='/meeting' element={<Meeting />} />
            <Route path='/meeting/:roomID' element={<ZvideoRoom/>} />
            <Route path='/meeting/create-meet/' element={<CreateMeeting />} />
            
            <Route path='/users' element={ role ==='manager'? <Users/> : <Navigate to='/'/>} />
            {/* No path provided, it acts as a catch-all route */}
            <Route  path='/*' element={<NotFound />} />
        </Routes>
    )
}

export default UserRoutes;