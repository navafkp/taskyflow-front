import axios from "axios";
import { useState } from "react";
import { VerifyOTP } from "../../Server/User/PasswordChange";
import ChangePasswordUpdate from "./changePasswordUpate";


const VerifyOTPPage = ({ email }) => {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    console.log(email, ' testing email prop')
    const submitOtp = async (e) => {
        e.preventDefault()
        console.log("just print", otp)
        const response = await VerifyOTP(otp, email)
        console.log(response, 'verify resposne otp')
        if (response.success == 'OTP Verified') {
            setShow(true)
        } else if (response.error == 'OTP mismatch') {
            setError(response.error)
        } else {
            setError(response.error)
        }




    }
    return (

        <>
            {show ? <ChangePasswordUpdate email={email} /> :

                <div
                    className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex 
        justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat 
        bg-center bg-cover bg-transparent"
                >
                    <div
                        className="absolute bg-black opacity-80 inset-0 z-0"
                    >
                    </div>
                    <div
                        className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-black"
                    >

                        <div
                            className="text-center p-5 flex-auto justify-center">
                            <p className="text-white mb-2" >Enter yout OTP </p>

                            <div>

                                <input className="mb-4" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            </div>

                            <button className='bg-zinc-300 p-2 rounded' onClick={submitOtp}>Submit</button>

                        </div>
                        <div
                            className="p-3 mt-2 text-center space-x-4 md:block"
                        >
                            <p className='text-white'>{error}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default VerifyOTPPage;
