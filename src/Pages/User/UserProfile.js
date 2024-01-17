import React, { useRef, useState } from 'react'
import Header from '../../Components/header';
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../Store/userdataSlice';
import { ChangeDetails } from '../../Server/User/userDetail';
import { CgProfile } from "react-icons/cg";
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';

const UserProfile = () => {
    const userData = useSelector((state) => state.userData);
    const { access } = useSelector((state) => state.usertoken);
    const load = useSelector(state => state.loading)
    const [popup, setPopup] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);


    // initial data for state - DATA
    const initialData = {
        name: userData?.name || '',
        username: userData?.username || '',
        email: userData?.email || '',
        designation: userData?.designation || '',
        image: userData?.profile_image_base64 || '',
    };

    const [data, setData] = useState(initialData)

    // input field value change
    const handleChange = (e) => {
        const { name, value } = e.target;
       
        console.log(name, value)    
        if (name === 'name' && /\d/.test(value)) {
            // If numeric characters are present in the "Name" field, do not update the state
            return;
        }  else{
            setData({ ...data, [name]: value })
        }
        
        
        
    };

    // Function to handle image upload

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        console.log("sasasa")
        console.log(reader, 'ioio')
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                console.log(ctx)
                // Resize the image if needed
                const maxWidth = 800; // Set your maximum width
                const maxHeight = 600; // Set your maximum height

                let width = img.width;
                let height = img.height;
                    console.log(width, height)
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                // Convert the canvas content to base64
                const resizedImage = canvas.toDataURL('image/jpeg');

                // Set the resized image in state
                setImage(resizedImage);
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    // change submit function
    const handleAllChange = () => {
        const requestData = image ? { ...data, 'image': image } : data;
        dispatch(setLoading(true))
        ChangeDetails(requestData, access)
            .then((response) => {
                dispatch(setLoading(false))
                setPopup(response.message);
                if (response.message === 'Updated succesfully') {
                    dispatch(updateUser(requestData))
                }
            }).catch((error) => {
                setPopup('update failed')
            })
    }

    return (
        <div className='flex'>
            <Header />
            <div className='p-7 w-full bg-[#FFFFFF]'>
                <div>
                    <h1
                        className='text-2xl text-black font-semibold 
                    text-left border-b mb-5 pb-3
                     border-gray-500'
                    >
                        USER PROFILE
                    </h1>
                </div>
                <div
                    className='flex lg:flex-col-reverse  text-white bg-[#b278a5] 
                mx-auto box-border 
                py-8 max-h-max w-[80%] md:w-full md:px-3  px-10 rounded-lg relative'
                >
                    {load && <Loading />}
                    <div
                        className=' w-9/12 lg:w-full capitalize'
                    >
                        <div
                            className='flex justify-between space-x-3   p-2 '>
                            <h3
                                className=' font-semibold  '>Name:</h3>
                            <input
                                className=" text-black rounded-md w-[50%] border px-3 py-1"
                                value={data?.name} onChange={handleChange} type='text' name='name'
                            />
                        </div>
                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Username:</h3>
                            <input
                                className="text-black rounded-md w-[50%] border px-3 py-1"
                                value={data.username} onChange={handleChange}
                                type='text' name='username'
                            />
                        </div>
                        <div className='flex justify-between  space-x-3   p-2'>
                            <h3 className=' font-semibold'>email:</h3>

                            <input className=" text-black rounded-md w-[50%] border px-3 py-1"
                                value={data.email} onChange={handleChange} type='email' name='email'
                            />
                        </div>
                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Role:</h3>
                            <p className='w-[50%]'>{userData?.role} </p>
                        </div>
                        <div className='flex justify-between space-x-3  p-2'>
                            <h3 className=' font-semibold'>Joined On:</h3>
                            <p className='w-[50%]'>
                                {new Date(userData?.date_joined).toLocaleString()}
                            </p>
                        </div>

                        {userData?.role === 'manager' ?
                            (<div className='flex justify-between  space-x-3  p-2'>
                                <h3 className=' font-semibold'>Designation:</h3>
                                <input
                                    className=" text-black rounded-md w-[50%] border px-3 py-1"
                                    value={data.designation} onChange={handleChange}
                                    type='text' name='designation'
                                />

                            </div>) :
                            (<div className='flex justify-between  space-x-3  p-2'>
                                <h3 className=' font-semibold'>Designation:</h3>
                                <p className='w-[50%]' >{data.designation} </p>
                            </div>)}

                        <div className='flex justify-between  space-x-3  p-2'>
                            <h3 className=' font-semibold'>Workspace:</h3>
                            <p className='w-[50%]'>{userData?.workspace} </p>
                        </div>

                        <button
                            className='bg-[#D7CDCC] text-black 
                            font-bold w-full my-3 rounded p-2'
                            onClick={handleAllChange} >Save Changes
                        </button>

                        <p className='text-app-green text-center'> {popup}</p>
                    </div>
                    {/* image */}
                    <div className=' w-3/12 lg:m-auto lg:mb-2'>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}

                                style={{
                                    display: "none"
                                }}
                                ref={imageUploader}

                            />
                            <div
                                className='rounded-full overflow-hidden '
                                style={{
                                    height: "130px",
                                    width: "130px",
                                }}
                                onClick={() => imageUploader.current.click()}
                            >
                                {!image && !data?.image ?
                                    <CgProfile style={{ color: '#', fontSize: '8em' }} /> :
                                    (<img
                                        ref={uploadedImage}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        src={image ? image : data?.image}
                                        alt="Profile"
                                    />)
                                }
                            </div>
                            <p
                                className='text-xs'
                            >
                                Click to upload Image
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile