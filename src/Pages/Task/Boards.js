import React, { useEffect, useState } from 'react'
import Header from '../../Components/header'
import { Link } from 'react-router-dom';
import CreateBoard from '../../Components/Board/CreateBoard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBoads } from '../../Store/boardSlice';
import { setLoading } from '../../Store/loadingSlice';
import Loading from '../../Components/loading';
import { MdDelete } from "react-icons/md";
import DeletePopUp from '../../Components/DeletePopUp';


const Boards = () => {

    const access = useSelector(state => state.usertoken.access)
    const { workspace, id, role } = useSelector(state => state.userData)
    const allboards = useSelector(state => state.boards)
    const load = useSelector(state => state.loading)
    const [showForm, setShowForm] = useState(false)
    const [boardData, setBoardData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState()
    const dispatch = useDispatch()


    console.log(role)
    // setting state boards data from redux store
    useEffect(() => {
        if (allboards) {
            setBoardData(allboards)
        }
    }, [allboards])


    // getting all boards data via axios call
    useEffect(() => {
        if (access && workspace) {
            dispatch(setLoading(true))
            dispatch(getAllBoads({ access, workspace })).then((res) => {
                dispatch(setLoading(false))
            })
        }
    }, [access, workspace, dispatch])


    // search specific user
    const handleSearch = async (e) => {
        const inputValue = e.target.value
        setName(inputValue)
        if (inputValue !== null && inputValue !== '') {
            const foundBoard = allboards?.filter(
                board => board.name.toLowerCase().includes(inputValue)
            );
            if (foundBoard?.length !== 0) {
                setBoardData(foundBoard);
            } else {
                setBoardData([]);
            }
        } else {
            if (allboards) {
                setBoardData(allboards);
            }
        }
    };

    return (
        <div className='flex md:h-full'>
            <Header />
            <div
                className="p-7 w-full bg-[#FFFFFF] "
            >
                <div>
                    <h1
                        className='text-2xl text-black font-semibold text-left border-b mb-5 pb-3
                     border-gray-500'>
                        MY BOARDS
                    </h1>
                </div>

                <div
                    className='bg-[#1D1E2C] md:flex-col md:items-center rounded-t-lg flex 
                justify-between p-3 border-b border-black'
                >
                    <div>
                        <button
                            onClick={() => setShowForm(true)}
                            className='bg-[#D7CDCC] text-sm  text-center text-black px-5 py-1 
                        rounded-lg '>CREATE BOARD<span className='font-bold text-lg'
                            >
                                +
                            </span>
                        </button>
                    </div>
                    <div className='relative'>
                        <input
                            value={name} onChange={handleSearch}
                            className='bg-[#D7CDCC]  font-bold border border-black  text-center
                         text-black px-2 py-1 m-2 rounded '
                            name='user' type='text' placeholder='search board'
                        />
                    </div>
                </div>

                <div className='bg-[#b278a5] p-2 '>
                    {load && <Loading />}
                    {boardData?.length > 0 ? boardData?.map((board) => {
                        // Check if the board is public or the current user is the creator
                        const canViewBoard = board.visibility === 'public' || board.user_id === id;
                        // If the user can view the board, render it; otherwise, skip rendering
                        return canViewBoard ? (
                            <div className='flex justify-between m-4 rounded-md bg-[#FFFFFF] p-4'>
                                <Link to={`/boards/${board.slug}+${board.id}`}
                                    className='flex w-[100%] justify-between' key={board.id}>
                                    <p className='font-bold'>{board.name}</p>
                                    <p
                                        className={`float-right ${board.visibility === 'public' ? 'text-green-400 uppercase font-bold rounded-lg px-2 py-1' : 'text-yellow-400 uppercase font-bold rounded-lg px-2 py-1'}`}>
                                        {board.visibility}
                                    </p>
                                </Link>
                                <div className='pt-1'>



                                    {
                                        role === 'manager'? (
                                            <button>
                                                <MdDelete onClick={(e) => setShowModal(true)} color='firebrick' size={'35px'} />
                                            </button>
                                        ):  board.user_id === id && (
                                            <button>
                                                <MdDelete onClick={(e) => setShowModal(true)} color='firebrick' size={'35px'} />
                                            </button>
                                        )
                                    }

                                    {showModal &&
                                        <DeletePopUp type={'board'} access={access} id={board.id}
                                            closeModal={() => setShowModal(false)} />}
                                </div>
                            </div>
                        ) : null;
                    }) : (
                        <p
                            className='text-center m-3 p-3 uppercase text-white font-semibold'>
                            No boards, go ahead and create boards
                        </p>
                    )}

                    {showForm && <CreateBoard closeModal={() => setShowForm(false)} />}



                </div>
            </div>
        </div >
    )
}

export default Boards