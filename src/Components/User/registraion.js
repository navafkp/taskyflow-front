import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserRegister } from '../../Server/User/userRegister'
import { Success } from '../../Store/authSlice'
import { userSchema } from '../../utils/registerValidation'
import { ValidationError } from 'yup'
import { addNewUser } from '../../Store/userslistSlice'

const Registraion = ({ closeModal }) => {
    const userData = useSelector(state => state.userData)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [designation, setDesignation] = useState('')
    const dispatch = useDispatch()

    // setting role
    const handleRole = (e) => {
        setRole(e.target.value)
    }

    const handleNameChange = (e) => {
        const value = e.target.value
         if (value && /\d/.test(value)){
             return
         }else{
             setName(value)
         }
     }
  

    // registration of member or manager by the manager after logged in his account
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            email: email,
            username: username,
            designation: designation,
            role: role,
            workspace: userData?.workspace,
            password: password,
            password2: password2,
        }

        if (
            name && email && username && role && designation
            && userData?.workspace && password && password2
        ) {
            try {
                await userSchema.validate(formData)
                const registrationResponse = await UserRegister(
                    name, username, email, userData?.workspace,
                    password, password2, role, designation
                )
                if (registrationResponse.message === 'Your Account Registered Successfully') {
                    console.log(registrationResponse.data, '=====================')
                    dispatch(addNewUser(registrationResponse.data))
                    dispatch(Success(registrationResponse))
                    closeModal()
                } else if (registrationResponse === 'Email already exists') {
                    setError('Email already exists')
                } else if (registrationResponse === 'Username already exists') {
                    setError('Username already exists')
                } else {
                    setError('Registration Failed, please check all details and try again')
                }
            } catch (error) {
                if (error instanceof ValidationError) {
                    setError(error.message)
                } else {
                    setError('Something went wrong, please try again');
                }
            }
        } else {
            setError("Please fill all details")
        }
    }


    return (
        <div>
            <div
                className=' absolute !w-[100%]  bg-app-bg rounded-lg'
            >
                <div
                    className='overlay '
                >
                    <div
                        className='modal-content '
                    >
                        <button
                            className='bg-[#1D1E2C]  ml-auto text-white w-[20px] h-[20px] flex justify-center 
                        items-center mt-4 rounded-full' onClick={closeModal}> x</button>
                        <form
                            className=" capitalize shadow-md rounded px-8 pt-2 pb-2 mb-3 w-full"
                        >
                            <p
                                className='uppercase text-center'>
                                Register new user
                            </p>

                            <div className="mb-1">
                                <input
                                    value={name} onChange={handleNameChange} required
                                    className="shadow appearance-none border rounded w-full py-2 px-3
                                 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  
                                 mt-1" id="name" type="text" placeholder="name"
                                />
                            </div>
                            <div className="mb-1">
                                <input
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    className="shadow appearance-none border rounded w-full
                                 py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline  mt-1"
                                    id="username" type="text" placeholder="username"
                                />
                            </div>
                            <div className="mb-1">
                                <input
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="shadow appearance-none border rounded 
                                w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline  mt-1"
                                    id="email" type="email" placeholder="email" required
                                />
                            </div>

                            <div className="mb-1">
                                <input
                                    value={designation} onChange={(e) => setDesignation(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline  mt-1"
                                    id="designation" type="text" placeholder="designation" required
                                />
                            </div>


                            <div className="my-1 flex ">
                                <h3 className='font-bold round p-2'>Workspace: </h3>
                                <p className='p-2  text-gray-400  font-medium rounded-sm'>{userData?.workspace}</p>

                            </div>


                            <div className="mb-1 pb-1">
                                <p className='font-bold '>Choose the Role of user</p>

                                <input id="member" name="role" type="radio" value="member"
                                    checked={role === 'member'}
                                    onChange={handleRole}
                                />
                                <label className='p-1 text-black' >Member</label>

                                <input id='manager' name="role" type='radio' value="manager"
                                    checked={role === 'manager'}
                                    onChange={handleRole}
                                />
                                <label className=' text-black' >Manager</label>
                            </div>

                            <div className="mb-1">
                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 
                                px-3 text-gray-700 mb-3 leading-tight 
                                focus:outline-none focus:shadow-outline mt-1"
                                    id="password" type="password" placeholder='password'
                                />
                            </div>

                            <div className="mb-1">
                                <input
                                    value={password2} onChange={(e) => setPassword2(e.target.value)}
                                    className="shadow appearance-none border  
                                rounded w-full py-2 px-3 text-gray-700 mb-3 
                                leading-tight focus:outline-none 
                                focus:shadow-outline mt-1"
                                    id="password2" type="password" placeholder='Confirm Password'
                                />
                            </div>
                            <div className="mb-1">
                                <p className='text-[#952e2e]'></p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button onClick={handleRegistrationSubmit}
                                    className=" bg-[#b278a5]  text-white font-bold py-2 px-4 rounded 
                                focus:outline-none focus:shadow-outline " type="button"
                                >
                                    Regsiter
                                </button>
                            </div>
                            <p className='text-[#da4646]'>{error}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registraion