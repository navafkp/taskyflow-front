import React, { useState } from 'react'
import { changePasswordSchema } from '../../utils/passwordChangeValidation'
import { useDispatch } from 'react-redux'
import { PasswordChangeAxios } from '../../Server/User/PasswordChange'
import VerifyOTPPage from './VerifyOTP'

const PasswordChange = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()


    const submitChangerequest = async (e) => {
        e.preventDefault()
        console.log(email)
        console.log("as")

        const formData = {
            email: email,
        };
        if (email) {
            console.log("2")
            try {
                await changePasswordSchema.validate(formData);
                console.log("3")
                const response = await PasswordChangeAxios(email);
                console.log(response.success, 'llll')

                if (response.success == 'OTP SEND') {
                    setShow(true)
                    
                }

            } catch (error) {
                setError(error.message)
            }
        } else {
            setError("Please enter correct email ID")
        }






    }


    return (
        <>
            {show ? <VerifyOTPPage email={email} /> :
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <div className="text-white text-center">
                        <h2 className="text-2xl font-bold mb-4">Enter your email address:</h2>
                        <form action="/submit_email" method="post">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                className="bg-white text-black py-2 px-4 rounded-md mb-4"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <input
                                type="submit"
                                value="Submit"
                                onClick={(e) => submitChangerequest(e)}
                                className="bg-white text-black py-2 px-4 rounded-md cursor-pointer"
                            />
                        </form>
                    </div>


                </div>
            }
        </>
    );
}

export default PasswordChange