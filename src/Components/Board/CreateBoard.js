import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBoard } from '../../Store/boardSlice'

const CreateBoard = ({ closeModal }) => {
    const access = useSelector(state => state.usertoken.access)
    const { id, workspace, role } = useSelector(state => state.userData)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [visibility, setVisibility] = useState('private')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    // creating new board with the given details
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name && description && visibility) {
            if (access && workspace) {
                console.log(access, workspace, id, name, description, visibility)
                dispatch(createNewBoard({ access, workspace, id, name, description, visibility })).then((res) => {
                    closeModal()
                })
            }
        } else {
            setError('Please fill all details required')
        }
    }

    return (

        <div
            className='absolute top-16 right-44 lg:right-24 xl:right-32  md:right-36 sm:right-10
         bg-app-bg rounded-lg w-[60%] xl:w-[50%] sm:w-[80%]'
        >
            <div className='overlay'>
                <div className='modal-content !rounded-lg '>
                    <button
                        className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center 
                    items-center mt-4 rounded-full'
                        onClick={closeModal}>
                        x
                    </button>
                    <h3 className=' font-bold text-center'>CREATE BOARD</h3>
                    <form className=" px-4 py-4 mb-4 w-full">
                        <div className='mb-3'>
                            <input
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                name="name" type='text' placeholder='board name'
                            />
                        </div>

                        <div className='mb-2 '>
                            <input
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline  mt-2"
                                name='description' type='text' placeholder='description'
                            />
                        </div>

                        <div className='flex justify-end'>
                            <h3 className='text-sm pr-2'>Visibility</h3>
                            <select
                                value={visibility} onChange={(e) => setVisibility(e.target.value)}
                                className=' border outline-none text-sm shadow uppercase rounded-md px-2 '
                            >
                                {role && role === 'manager' ? (
                                    <>
                                        <option value='public' className='rounded-lg'>Public</option>
                                        <option value='private' className='rounded-lg'>Private</option>
                                    </>
                                ) : (
                                    <option value='private' className='rounded-lg'>Private</option>
                                )}
                            </select>
                        </div>

                        <div className='text-center mt-3'>
                            <button onClick={handleSubmit}
                                className=' bg-[#9C528B] text-white w-full rounded-lg m-2 py-1 text-center'
                            >
                                CREATE
                            </button>
                        </div>

                    </form>
                    <p>{error}</p>
                </div>
            </div>
        </div>
    )
}

export default CreateBoard