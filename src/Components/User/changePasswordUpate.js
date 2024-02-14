import { useState } from "react";
import { ChangePassword } from "../../Server/User/PasswordChange";
import { useNavigate } from 'react-router-dom'


const ChangePasswordUpdate = ({email}) => {

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()


    const submitPassword = async (e) => {
        e.preventDefault()
        console.log(password, password2, 'pasweos')
        const response = await ChangePassword(email, password, password2)
        console.log(response, 'vetr happy end')
        if(response.message == 'Your password has been updated'){
            navigate('/login')

        }else{
            setError('password not updated, try after sometime')
        }


    }


    return (

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


                    <div>
                        <label> New password</label>
                        <input name="password" className="mb-4" type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div>
                        <label> Confirm password</label>
                        <input name="password2" className="mb-4" type="text" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                    </div>

                    <button className='bg-zinc-300 p-2 rounded' onClick={submitPassword}>Submit</button>

                </div>
                <div
                    className="p-3 mt-2 text-center space-x-4 md:block"
                >
                    <p className='text-white'>{error}</p>
                </div>
            </div>
        </div>


    );
};

export default ChangePasswordUpdate;
