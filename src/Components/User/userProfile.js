import React from 'react'
import { useSelector } from 'react-redux'

const UserProfile = ({ user_id, closeModal }) => {
    const users = useSelector(state => state.users)

    // getting specific user details to show in user modal of users
    const result = users?.find(({ id }) => {
        return id === user_id
    })

    return (
        <div 
        className='absolute top-16 right-44 lg:right-24 xl:right-32 md:h-[80%] 
        md:right-36 sm:right-10 bg-[#b278a5] rounded-2xl w-[60%] xl:w-[50%] sm:w-[80%]'
        >
            <div className='p-4  capitalize w-full'>
                <button className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] 
                flex justify-center items-center align-middle  rounded-full' 
                onClick={closeModal}>
                    x
                    </button>
                <div>
                    <h1 
                    className='text-2xl  font-semibold text-left border-b mb-5 pb-3
                     border-gray-500'>
                        {result?.name}
                        </h1>
                </div>
                <div
                 className='flex mx-auto box-border  py-8 max-h-max w-[80%] 
                 px-10 sm:px-0 rounded-lg '
                 >
                    <div className=' w-9/12 capitalize'>

                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Username:</h3>
                            <p>{result?.username}</p>
                        </div>
                        <div className='flex space-x-3   p-2'>
                            <h3 className=' font-semibold'>email:</h3>

                            <p>{result?.email}</p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Role:</h3>
                            <p>{result?.role} </p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Joined On:</h3>
                            <p>{new Date(result?.date_joined).toLocaleString()} </p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Designation:</h3>
                            <p>{result?.designation}</p>
                        </div>
                        <div className='flex space-x-3  p-2'>
                            <h3 className=' font-semibold'>Workspace:</h3>
                            <p>{result?.workspace} </p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile