import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AssigneeInvite, addComment, assigneeUpdate,
    cardEditableUpdate, getAllComment
} from '../../Store/cardSlice';
import { MdModeEdit } from "react-icons/md";
import { setLoading } from '../../Store/loadingSlice';
import DeletePopUp from '../DeletePopUp';
import { RemoveAssignee } from '../../Server/Card/RemoveAssignee';

const OneCard = ({ task, closeModal }) => {
    const access = useSelector(state => state.usertoken?.access)
    const userdata = useSelector(state => state.userData)
    const allboard = useSelector(state => state.boards)
    const assigneeList = useSelector(state => state.cardData.assignee)
    const commentList = useSelector(state => state.cardData?.comments)
    const users = useSelector(state => state.users)
    const [description, setDescription] = useState(task?.description)
    const [maxMembers, setMaxMembers] = useState(task.max_members)
    const load = useSelector(state => state.loading)
    const [error, setError] = useState('')
    const [taskAssignee, setTaskAssignee] = useState('')
    const [title, setTitle] = useState(task?.title)
    const [comment, setComment] = useState('')
    const initialField = { title: false, description: false, max_members: false }
    const [editableFields, setEditableFields] = useState(initialField);
    const [email, setEmail] = useState([''])
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [board, setBoard] = useState()
    const dispatch = useDispatch()
    const card_id = task?.id

    useEffect(()=>{
        console.log(task, 'tasktasktasktasktask')
    })
    // getting emails from users list and setting in email state
    useEffect(() => {
        if (users && users?.length > 0) {
            const emails = users?.map((user) => user.email)
            setEmail(emails)
        }
    }, [users])


    // choosing specific board from all board
    useEffect(() => {

        if (allboard) {
            // spilt board id from useparams
            const board = allboard?.find((board) => board.id.toString() == task?.board)
            setBoard(board)
        }

    }, [])


    // suggestion input change
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value === '') {
            setSuggestions([]); // Clear suggestions when the input is empty
        } else if (value.length > 2) {
            const newSuggestions = getSuggestions(value);
            setSuggestions(newSuggestions);
        }
    };
    // when one email clicked
    const handleSuggestionClick = (suggestion) => {
        setInputValue('');
        if (selectedEmails.includes(suggestion)) {
            setError('Already added the member')
        } else {
            setSelectedEmails([...selectedEmails, suggestion]);
        }
        setSuggestions([]);
    };

    // removing email from suggestion
    const handleRemoveEmail = (email) => {
        const updatedEmails = selectedEmails.filter((e) => e !== email);
        setSelectedEmails(updatedEmails);
    };

    // showing suggestion based on input
    const getSuggestions = (input) => {
        return email.filter((suggestion) =>
            suggestion.toLowerCase().includes(input.toLowerCase())
        );
    };


    // inviting members to the card
    const handleInviteSubmit = (e) => {
        e.preventDefault()
        const size = maxMembers - taskAssignee?.length
        if (selectedEmails?.length > size) {
            setError('assignee exceed the maximum member limit')
        } else {
            setError('')
            dispatch(setLoading(true))
            dispatch(AssigneeInvite({ access, selectedEmails, card_id }))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        dispatch(setLoading(false))
                        setSelectedEmails([])
                    }
                })
        }
    }

    // collecing assignees data from redux based on the card
    useEffect(() => {
        const asigneeSet = () => {
            const collectAssignee = assigneeList?.filter((assignee) => {
                return task.id === assignee.card
            })
            setTaskAssignee(collectAssignee)
        }
        asigneeSet()
    }, [assigneeList])


    // get all comments
    useEffect(() => {
        dispatch(getAllComment({ access, card_id }))
    }, [])

    // removing assignees and update redux data
    const handleRemoveAssignee = (id) => {
        if (access) {
            RemoveAssignee(access, id)
                .then((response) => {
                    if (response === 'Successfully deleted') {
                        const assigneNewList = assigneeList?.filter((user) => user.id != id)
                        if (assigneNewList) {
                            dispatch(assigneeUpdate(assigneNewList))
                        }
                    } else {
                        setError('Something went wrong, try again')
                    }
                })
        }
    };

    // add- comment
    const handleSubmit = (event) => {
        event.preventDefault();
        if (access && userdata?.id && userdata?.name && comment) {
            const user_name = userdata?.name
            const user_id = userdata?.id
            dispatch(addComment({ access, user_id, user_name, comment, card_id }))
                .then((response) => {
                    setComment('')
                })
        }
    };


    // comment state  - onchange date update
    const handleChange = (event) => {
        setComment(event.target.value);
    };

    // when edit button clicked, ready only data make it editable 
    const makeEditable = (name) => {
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: true,
        }));
    }

    // maximum member should not go below zero
    const handleMaxMemberOnChange = (e) => {
        if (parseInt(e.target.value) < taskAssignee?.length) {
            setError('maximum member cannot go below assignee count')
        }
        else if (e.target.value > '0') {
            setMaxMembers(e.target.value)
            setError('')
        } else {
            setMaxMembers(0)

        }
    }

    // updating data from editable field
    const handleCardUpdate = (e) => {
        setError('')
        e.preventDefault()
        const updatedData = {};
        if (editableFields.title) {
            updatedData.title = title;
        }
        if (editableFields.description) {
            updatedData.description = description;
        }
        if (editableFields.max_members) {
            updatedData.max_members = maxMembers;
        }
        if (updatedData) {
            dispatch(cardEditableUpdate({ access, card_id, updatedData }))
                .then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setEditableFields(initialField)

                    }
                })
        }
    }

    return (
        <div
            className='absolute !w-[100%]  bg-app-bg rounded-lg'
        >
            <div
                className='overlay  flex justify-center'
            >
                <div
                    className=' h-max !rounded-3xl w-[60%] sm:w-[90%]  bg-[#b278a5] text-center  
                mt-1 overflow-hidden '>
                    <form>
                        <div
                            className='px-4 pt-3 pb-2 justify-between flex items-center border-b 
                         border-gray-500'
                        >
                            <div
                                className='flex relative'
                            >
                                <input
                                    name="title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`border ${editableFields.title === true ? 'bg-white '
                                        : 'bg-transparent text-white'} border-[#d995ca]   
                                    text-center font-normal 
                                    text-sm uppercase rounded-lg py-2 pr-5`}
                                    readOnly={!editableFields.title}
                                    value={title}
                                />
                                {!editableFields.title && <MdModeEdit
                                    className='absolute right-2 m-auto  top-0 bottom-0'
                                    onClick={() => makeEditable('title')} />}
                            </div>
                            {Object.values(editableFields).includes(true) && (
                                <button onClick={handleCardUpdate}
                                    className='bg-green-300 rounded-md px-2 py-1 '>
                                    Save Changes
                                </button>
                            )}
                            <button
                                className='bg-[#0c0c0f] text-white w-[20px] h-[20px] flex justify-center  
                            items-center rounded-full' onClick={closeModal}
                            >
                                x
                            </button>
                        </div>
                        {/* bootsrap col */}
                        <div
                            className="grid grid-cols-2 lg:grid-cols-1 overflow-y-auto gap-4 
                        rounded-lg px-4 pb-5 pt-4 bg-[#EEF2F5] h-full"
                        >
                            <div className=' text-left sm:mb-3'>
                                <div
                                    className='flex border border-gray-500 relative py-2'>
                                    <textarea
                                        onChange={(e) => setDescription(e.target.value)}
                                        name="description" id="description"
                                        className={`w-full h-[100px] 
                                         ${editableFields.description === true ? 'bg-white '
                                                : 'bg-transparent text-black'}  
                                                 text-sm font-normal capitalize  
                                        rounded-lg  border-none  pr-5 pl-2`}
                                        value={description}
                                        readOnly={!editableFields.description}
                                    />
                                    {!editableFields.description && <MdModeEdit color='red'
                                        className=' absolute right-4 ' onClick={() =>
                                            makeEditable('description')}
                                    />}
                                </div>
                                {/* comments */}
                                <div className='  mt-5 mb-3'>
                                    <h4 className='text-[#9C528B] mb-2'>Comments</h4>
                                    <div className='w-full max-h-[150px] overflow-y-auto pb-2'>
                                        {commentList?.length > 0 &&
                                            commentList?.slice().sort((a, b) => b.id - a.id).map((one) =>
                                            (<div className='block capitalize text-sm py-1 border-b'
                                                key={one.id}
                                            >
                                                <p
                                                    className='text-green-800'>
                                                    {one.user_name}:
                                                </p>
                                                <div className='flex justify-between'>
                                                    <p
                                                        className='pl-5 text-gray-500 '>
                                                        {one.comment}
                                                    </p>
                                                    <p
                                                        className='pl-2 text-sm font-normal
                                                         text-gray-500 '
                                                    >
                                                        {new Date(one.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>)
                                            )}
                                    </div>
                                    <form className='justify-center block'>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            className='text-sm font-normal capitalize border p-2 
                                            w-full h-[50px] border-[#b278a5] rounded'
                                            rows="4"
                                            cols="50"
                                            value={comment}
                                            onChange={handleChange}
                                        ></textarea>
                                        <input
                                            onClick={handleSubmit}
                                            type="submit" value="Submit"
                                            className='bg-[#D7CDCC] px-6 py-1 rounded-md'
                                        />
                                    </form>
                                </div>
                            </div>

                            <div className='bg-[#EEF2F5]'>
                                <div className='  font-normal  rounded-lg  bg-[#EEF2F5] '>
                                    <div className='flex justify-between pb-2'>
                                        <h3 className='text-left text-[#9C528B] font-bold '>
                                            Card details
                                        </h3>
                                    </div>

                                    <div className='flex pb-2'>
                                        <p className='text-left font-bold '>Date</p>
                                        <p className='ml-2'>
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex pb-2'>
                                        <p className='text-left font-bold '>Maximum Members</p>
                                        <div className='flex relative'>
                                            <input type='number'
                                                name='max_members'
                                                onChange={handleMaxMemberOnChange}
                                                className={`border 
                                                ${editableFields.max_members === true ? 'bg-white '
                                                        : 'bg-transparent text-black'}  text-center ml-1 
                                                font-normal text-sm uppercase rounded-lg !w-auto`}
                                                readOnly={!editableFields.max_members}
                                                value={maxMembers}
                                            />
                                            {task && task?.column !== "3" &&
                                                !editableFields.max_members &&
                                                <MdModeEdit color='red'
                                                    className=' absolute right-4 m-auto top-0 bottom-0'
                                                    onClick={() => makeEditable('max_members')} />}
                                        </div>
                                    </div>

                                    <div className='pb-2'>
                                        <p className='text-left font-bold mb-1'>Assignees</p>
                                        {taskAssignee ? (
                                            taskAssignee.map((user, index) => (
                                                <div key={index} className='ml-2 flex mb-2 items-center'>
                                                    <p className='rounded-lg  p-1'> {user.user}</p>
                                                    {task && task?.column !== "3" &&
                                                        <button
                                                            className='bg-[#D7CDCC] text-red-600 
                                                            text-sm 
                                                            rounded-full 
                                                            font-bold px-0 py-0 h-6 w-6 ml-3 '
                                                            type='button'
                                                            onClick={() => handleRemoveAssignee(user.id)}
                                                        >
                                                            x
                                                        </button>
                                                    }
                                                </div>
                                            ))
                                        ) : (
                                            'None'
                                        )}
                                        <p className='text-center text-red-600 font-medium'>{error}</p>
                                    </div>

                                    {task && task?.column !== "3" &&
                                        <>
                                            <div className='flex'>
                                                <label htmlFor="inviteNewMember"
                                                    className=" mr-2 text-left 
                                                font-bold mb-2">
                                                    Select New Member
                                                </label>

                                                <input className='rounded-xl border '
                                                    type="text"
                                                    id="email"
                                                    value={inputValue}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div>
                                                {suggestions.length > 0 && (
                                                    <ul>
                                                        {suggestions.map((suggestion, index) => (
                                                            <div
                                                                className='bg-yellow-200 m-1 border
                                                                 w-[60%] 
                                                            rounded-2xl px-3 py-1' >
                                                                <li
                                                                    key={index}
                                                                    onClick={() => handleSuggestionClick(suggestion)}>
                                                                    {suggestion}
                                                                </li>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            {selectedEmails.length > 0 && (
                                                <div className='flex text-start mt-2  '>
                                                    <strong className='mr-2'>Selected Emails:</strong>
                                                    <ul>
                                                        {selectedEmails.map((email, index) => (
                                                            <li
                                                                className='bg-red-300 rounded-lg px-2 py-1 mb-2'
                                                                key={index}>
                                                                {email}{' '}
                                                                <button
                                                                    className=' bg-[#D7CDCC]
                                                                     text-red-600 text-sm 
                                                                    rounded-full 
                                                                    font-bold px-0 py-0 h-6 w-6 ml-3 '
                                                                    type='button'
                                                                    onClick={() => handleRemoveEmail(email)}>
                                                                    x
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    }
                                    {selectedEmails.length != 0 && (
                                        selectedEmails?.length == 1 ? (
                                            <button
                                                onClick={handleInviteSubmit}
                                                className='size-4/4 bg-[#D7CDCC] border 
                                                rounded-md px-1  '
                                            >
                                                INVITE
                                            </button>) :
                                            (<button onClick={handleInviteSubmit}
                                                className='size-4/4 bg-[#D7CDCC]
                                                 border rounded-md px-1  '>
                                                INVITE ALL
                                            </button>)
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>

                    {userdata && userdata?.role === 'manager'? (<button
                        className='bg-red-400 float-right mr-3 rounded-2xl my-2 px-2 py-1'
                        onClick={(e) => setShowModal(true)}>
                        Delete Card
                    </button>) :  board && board?.visibility === 'private' && (<button
                        className='bg-red-400 float-right mr-3 rounded-2xl my-2 px-2 py-1'
                        onClick={(e) => setShowModal(true)}>
                        Delete Card
                    </button>)
                    
                     }

                    {showModal &&
                        <DeletePopUp type={'card'} access={access} id={task.id}
                            closeModal={() => setShowModal(false)}
                        />}
                </div>
            </div >
        </div >
    )
}

export default OneCard