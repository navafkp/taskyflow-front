import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import UserRoutes from './Routes/UserRoutes';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import PrivateRoutes from './Routes/PrivateRoutes';
import { userDetail } from './Store/userdataSlice';
import { useEffect } from 'react';
import GetAccessToken from './utils/getAccessToken';
import { getAllBoads } from './Store/boardSlice';
import { getAllMeeting } from './Store/MeetingSlice';
import { alluserDetails } from './Store/userslistSlice';
import PasswordChange from './Components/User/PasswordChange';
import NotFound from './Components/NotFound';



function App() {
  const { access, is_authenticated, type } = useSelector(state => state.usertoken)
  const userData = useSelector(state => state.userData)
  const userslist = useSelector(state => state.users)
  const dispatch = useDispatch()

  // getting refresh token if accedd about to expire
  GetAccessToken()

  // getting user details if access ot if any change in access
  useEffect(() => {
    if (access && type === 'user') {
      dispatch(userDetail(access));
    }
  }, [access])

  // getting all boards data
  useEffect(() => {
    if (access && userData?.workspace) {
      const workspace = userData?.workspace
      if (workspace) {
        dispatch(getAllBoads({ access, workspace }))
      }

    }
  }, [access, userData?.workspace, dispatch])

  useEffect(() => {
    if (access && userData?.workspace) {
      const workspace = userData?.workspace
      if (workspace) {
        dispatch(getAllMeeting({ access, workspace }))
      }
    }
  }, [access, userData?.workspace, dispatch])

  // get all user
  useEffect(() => {
    if (userData && userslist?.length === 0) {
      if (userData?.role === 'manager') {
        const workspace = userData?.workspace
        if (workspace) {
          dispatch(alluserDetails({ access, workspace }))
        }
      }
    }
  })


  return (
    <div className="App bg-[#FFFFFF] h-screen">
      <Router  basename={process.env.PUBLIC_URL}>
        <Routes>
          {/* private routes */}
          <Route path='/*' element={<PrivateRoutes is_authenticated={is_authenticated} isValidUser={type === 'user'} redirect='/login' children={<UserRoutes role={userData?.role} />} />} />

          {/* Public Routes */}
          <Route path='/login' element={!is_authenticated ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='/register' element={!is_authenticated ? <Register /> : <Navigate to='/dashboard' />} />
          <Route path="/changepassword" element={!is_authenticated ? <PasswordChange /> : <Navigate to='/dashboard' />} />
          {/* No path provided, it acts as a catch-all route */}
          <Route  path='*' element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;
