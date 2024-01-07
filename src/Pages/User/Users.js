import React, { useEffect, useState } from 'react'
import Header from '../../Components/header';
import './user.css'
import Registraion from '../../Components/User/registraion';
import { useDispatch, useSelector } from 'react-redux';
import { userBlockUpdate } from '../../Store/userslistSlice'
import UserProfile from '../../Components/User/userProfile';
import { BlockUser } from '../../Server/User/blockUser';
import Loading from '../../Components/loading';

const Users = () => {
    const access = useSelector(state => state.usertoken.access)
    const userslist = useSelector(state => state.users)
    const load = useSelector(state => state.loading)
    const [showform, setShowform] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [userSelected, setUserSelected] = useState('')
    const [searchname, setSearchName] = useState()
    const [result, setResult] = useState([])
    const [userBlocked, setUserBlocked] = useState(false);
    const dispatch = useDispatch()

    //    getting users data from redux and updatating to state
    useEffect(() => {
        if (userslist?.length !== 0 && userBlocked === false) {
            setResult(userslist)
        }
    }, [userslist, userBlocked])


    useEffect(()=>{
        if(showModal === false){
            setResult(userslist)
        }
    }, [])

    // registration modal visibility handle
    const handleForm = () => {
        setShowform(true)
    }

    // View user profile modal visibility handle
    const viewProfile = (id) => {
        setShowModal(true)
        setUserSelected(id)
    }

    // user block and activate handle
    const handleAction = (id, e) => {
        const value = e.target.value;
        let abc;
        if (value === 'Active') {
            abc = true;
        } else {
            abc = false;
            setUserBlocked(true)
        }
        BlockUser(id, value, access)
            .then((response) => {
                dispatch(userBlockUpdate({id, value}))
                setResult((prevResult) => {
                    return prevResult.map((user) => {
                        console.log(typeof(user.id) === typeof(id));
                        if (user.id === id) {
                            return {
                                ...user,
                                is_active: abc,
                            };
                        }
                        return user;
                    });
                });


            })
    };

    // search specific user
    const handleSearch = async (e) => {
        const inputValue = e.target.value;
        setSearchName(inputValue)
        if (inputValue !== null && inputValue !== '') {
            const foundUsers = userslist?.filter(
                user => user.name.toLowerCase().includes(inputValue.toLowerCase())
                    || user.username.toLowerCase().includes(inputValue.toLowerCase())
            );
            if (foundUsers?.length !== 0) {
                setResult(foundUsers);
            } else {
                setResult([]);
            }
        } else {
            setResult(userslist);
        }
    };

    return (
        <div className='flex'>
            <Header />
            <div
                className="p-7 w-full overflow-hidden bg-[#FFFFFF] "
            >
                <div>
                    <h1
                        className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3'
                    >
                        USERS LIST
                    </h1>
                </div>
                <div className='flex flex-row md:!flex-col md:items-center md:mb-2 justify-between mb-5 mt-6'>
                    <div>
                        <button
                            onClick={handleForm}
                            className='bg-[#D7CDCC] text-sm border border-black 
                            text-center text-black 
                        px-3 py-1 rounded '>
                            CREATE USER
                            <span className='font-bold text-lg'>+</span>
                        </button>
                    </div>

                    <div className='relative'>
                        <input
                            value={searchname} onChange={handleSearch}
                            className='bg-[#D7CDCC]  font-bold border
                             border-black  text-center
                         text-black px-2 py-1 m-2 rounded '
                            name='user' type='text' placeholder='search user'
                        />

                    </div>
                </div>

                {/* data starts here */}
                <div className="py-2 align-middle overflow-x-auto ">
                    <div className="shadow  sm:rounded-lg w-max">
                        {load && <Loading />}
                        <table
                            className="text-sm text-white block border-0 w-max">
                            <thead
                                className="bg-[#1D1E2C] text-xs uppercase font-medium">
                                <tr>

                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider">
                                        Username
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider"
                                    >
                                        Role
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider">
                                        Joining Date
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider">

                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-[#b278a5] relative">
                                {result?.length !== 0 ? (
                                    result?.map((user) => {
                                        return (<tr key={user?.id}
                                            className="bg-black bg-opacity-20">
                                            <td className=" px-6 py-4 whitespace-nowrap">
                                                {user?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user?.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(user?.date_joined).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className='
                                                    bg-[#D7CDCC] text-center
                                                    text-black font-normal 
                                                    rounded px-2 py-1'

                                                    onClick={() => viewProfile(user?.id)}>
                                                    view
                                                </button>
                                            </td>
                                            <td className="flex px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={user?.is_active ? 'Active' : 'block'}
                                                    onChange={(e) => handleAction(user?.id, e)}
                                                    className={`font-semibold  rounded px-1 py-1 ${user?.is_active ?
                                                        'text-green-300' : 'text-red-800'}`}
                                                >
                                                    <option
                                                        className=' rounded-lg ' value={'Active'}>
                                                        Active
                                                    </option>
                                                    <option
                                                        className=' rounded-lg text-red-800'
                                                        value={'block'}>
                                                        Block
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>)
                                    })
                                ) : <h3 className='absolute  text-red-700 
                                uppercase w-[2000px]'>
                                    No User found
                                </h3>}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showform &&
                <Registraion closeModal={() =>
                    setShowform(false)
                } />
            }
            {showModal && <UserProfile user_id={userSelected} closeModal={() => {
                setShowModal(false)
            }} />}
        </div>
    )
}

export default Users