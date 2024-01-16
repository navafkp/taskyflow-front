import { NavLink, useNavigate } from 'react-router-dom'
import { Logout } from '../Store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Store/userdataSlice';
import { FaUser } from "react-icons/fa";
import { MdDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import { IoNotificationsCircleOutline, IoLogOutOutline } from "react-icons/io5";
import { BsCameraVideoFill } from "react-icons/bs";
import { useState } from 'react';
import { CgMenuRound } from "react-icons/cg";
import { clearBoard } from '../Store/boardSlice';
import { clearcolumns } from '../Store/columnsSlice';
import { clearNotification } from '../Store/notificationSlice';
import { clearCard } from '../Store/cardSlice';
import { clearMeet } from '../Store/MeetingSlice';
import { clearUsers } from '../Store/userslistSlice';

const Header = () => {
  const userData = useSelector(state => state.userData)
  const [showNav, setShowNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // while loging out, cleared all data from state and redirect logging page
  const logoutUser = () => {
    dispatch(clearUser());
    dispatch(clearBoard());
    dispatch(clearUsers());
    dispatch(clearcolumns());
    dispatch(clearNotification());
    dispatch(clearCard());
    dispatch(clearMeet());
    dispatch(Logout());
    navigate('/login')
  }

  return (
    <div
      className={`flex   ${showNav && 'md:w-[100vw]  md:h-[100vh] md:bg-black/50 md:z-50 md:absolute'}`}
    >

      {/* Desktop */}
      <div className=' md:hidden'>
        <div
          className='bg-[#1D1E2C] h-[100%] min-h-[100vh] pt-8 w-60 md:absolute md:z-10'
        >
          <div
            className='text-[#b278a5]   p-2 text-center text-2xl font-extrabold'
          >
            TASKYFLOW
          </div>
          <div className='flex flex-col  text-white my-menu'>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/home'>
                <MdDashboard />Dashboard </NavLink>
            </div>

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/home' >
                <MdDashboard /> Dashboard </NavLink>
            </div>

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/dashboard' >
                <MdDashboard /> Dashboard </NavLink>
            </div>


            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/board' >
                <MdOutlineSpaceDashboard />Board</NavLink>
            </div>

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/notification' >
                <IoNotificationsCircleOutline />Notification</NavLink>
            </div>
            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/meeting' >
                <BsCameraVideoFill />Meet</NavLink>
            </div>

            {userData?.role === 'manager' && (<div>
              <NavLink className='flex p-3 items-center gap-2' to='/users'>
                <FaUser />Users
              </NavLink>
            </div>)}

            <div >
              <NavLink className='flex p-3 items-center gap-2' to='/profile'  >
                <FaUser />Profile</NavLink>
            </div>
            <div >
              <span
                className='flex p-3 items-center gap-2'
              >
                <IoLogOutOutline />
                <button onClick={logoutUser}>
                  Logout
                </button></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='hidden md:block'>
        <button
          onClick={() => setShowNav(!showNav)} className='absolute right-3 top-2'
        >
          <CgMenuRound size={30} /></button>
        {showNav &&
          <div
            className='bg-app-bg h-[100%] min-h-[100vh] pt-8 w-60 md:absolute md:z-10'
          >
            <div
              className='text-app-blue p-3 font-extrabold'
            >
              TASKYFLOW
            </div>
            <div className='flex flex-col my-menu'>
              <div >
                <NavLink className='flex p-3 items-center gap-2' to='/'>
                  <MdDashboard />Dashboard</NavLink>
              </div>
              <div >
                <NavLink className='flex p-3 items-center gap-2' to='/board' >
                  <MdOutlineSpaceDashboard />Board</NavLink>
              </div>
              <div >
                <NavLink className='flex p-3 items-center gap-2' to='/notification' >
                  <IoNotificationsCircleOutline />Notification</NavLink>
              </div>
              <div >
                <NavLink className='flex p-3 items-center gap-2' to='/meet' >
                  <BsCameraVideoFill />Meet</NavLink>
              </div>

              {userData?.role === 'manager' && (<div>
                <NavLink className='flex p-3 items-center gap-2' to='/users'>
                  <FaUser />Users
                </NavLink>
              </div>)}

              <div >
                <NavLink className='flex p-3 items-center gap-2' to='/profile'  >
                  <FaUser />Profile</NavLink>
              </div>
              <div >
                <span className='flex p-3 items-center gap-2' >
                  <IoLogOutOutline />
                  <button onClick={logoutUser}>
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Header