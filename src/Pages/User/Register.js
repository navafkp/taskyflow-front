import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSchema } from '../../utils/registerValidation';
import { Success } from '../../Store/authSlice';
import { UserRegister } from '../../Server/User/userRegister';
import { useDispatch } from 'react-redux';
import { ValidationError } from 'yup';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [workspace, setWorkapce] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNameChange = (e) => {
        const value = e.target.value
        if (value && /\d/.test(value)) {
            return
        } else {
            setName(value)
        }
    }


    // user registration function
    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            email: email,
            username: username,
            workspace: workspace,
            password: password,
            password2: password2,
        }

        if (
            name, email, username, workspace, password, password2
        ) {
            try {
                await userSchema.validate(formData)
                const registrationResponse = await UserRegister(
                    name, username, email, workspace, password, password2
                )
                if (registrationResponse.message === 'Your Account Registered Successfully') {
                    dispatch(Success(registrationResponse))
                    navigate('/login')
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
        <div >
            <div
                className="h-screen bg-[#D7CDCC] flex flex-col items-center justify-center"
            >
                <div>
                    <h1
                        className='m-8 font-extrabold text-4xl'>
                        TASKYFLOW
                    </h1>
                </div>
                <form
                    className=" bg-black/30 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/12 
                sm:w-11/12 md:w-8/12 lg:w-6/12 "
                >
                    <div className="mb-2">
                        <input
                            value={name} onChange={handleNameChange} required

                            className="shadow appearance-none border rounded w-full 
                            py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none 
                            focus:shadow-outline  mt-2" id="name" type="text"
                            placeholder="name"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded 
                            w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none 
                            focus:shadow-outline  mt-2" id="username"
                            type="text" placeholder="username"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border 
                            rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none 
                            focus:shadow-outline  mt-2" id="email" type="email"
                            placeholder="email" required
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={workspace} onChange={(e) => setWorkapce(e.target.value)}
                            className="shadow appearance-none border 
                            rounded w-full py-2 px-3 text-gray-700 
                            leading-tight focus:outline-none 
                            focus:shadow-outline  mt-2" id="workspace"
                            type="text" placeholder="workspace"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border 
                            rounded w-full py-2 px-3 text-gray-700 mb-3
                             leading-tight focus:outline-none 
                             focus:shadow-outline mt-2" id="password"
                            type="password" placeholder='password'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
                            className="shadow appearance-none border 
                            rounded w-full py-2 px-3 text-gray-700 
                            mb-3 leading-tight focus:outline-none 
                            focus:shadow-outline mt-2"
                            id="password2" type="password" placeholder='Confirm Password'
                        />
                    </div>
                    <div className="mb-2">
                        <p className='text-[#952e2e]'>{error}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleRegistrationSubmit}
                            className="bg-[#9C528B]  text-white 
                            font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline "
                            type="button" >
                            Regsiter
                        </button>
                        <p className='text-white'>Forgot Password?</p>
                    </div>
                </form>
                <p >Already member?
                    <Link className='text-[#9C528B] font-bold' to='/'>
                        Login here
                    </Link></p>
                <p className="text-center  text-xs">
                    &copy;2023 TaskyFlow. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Register