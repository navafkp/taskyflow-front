import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../Store/loadingSlice'
import Loading from '../loading'
import { getBroadcastNotification } from '../../Store/notificationSlice'

const Broadcast = ({ limit }) => {
  const access = useSelector(state => state.usertoken.access)
  const userData = useSelector(state => state.userData)
  const load = useSelector(state => state.loading)
  const allNotifications = useSelector(state => state.notification.broadcast)
  const [result, setResult] = useState([])
  const dispatch = useDispatch()


  // setting 3 notification for dashboard
  useEffect(() => {
    if (limit) {
      if(allNotifications?.length > 0){
        const filteredNotifications = allNotifications?.slice(0, limit);
      setResult(filteredNotifications);
      }
      
    }
    else {
      setResult(allNotifications);
    }
  }, [limit]);

  // getting all notifications
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        dispatch(setLoading(true));
        const workspace = userData?.workspace
        if (workspace) {
          await dispatch(getBroadcastNotification({ access, workspace }));
          dispatch(setLoading(false));
        }

      } catch (error) {
        // Handle error if needed
        dispatch(setLoading(false));
      }
    };
    fetchNotification();
  }, [dispatch, access, userData?.workspace]);

  return (
    <>
      {load && <Loading />}
      {result?.length > 0 &&
        result.map((notification) => {
          return (
            <div
              className='bg-[#FFFFFF]  border md:block p-3 mb-3 flex flex-row  
              justify-around rounded-md text-justify'
            >
              <p className='font-bold text-black'>
                {notification.content}
              </p>
              <p className='pt-4 text-black md:pt-1'>
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>)
        })}
    </>

  )
}

export default Broadcast