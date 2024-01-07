import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Card from '../Card/Card';
import { MdModeEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { EditColumn } from '../../Server/Columns/EditColumn';

const Columns = ({ columnTitle, tasks, columnid, boardId }) => {
    const [editableFields, setEditableFields] = useState(false);
    const { access } = useSelector(state => state.usertoken)
    const [title, setTitle] = useState(columnTitle)

    // when edit button clicked, ready only data make it editable 
    const makeEditable = (column) => {
        setEditableFields(true)
    }

    // colum name edit
    const handleColumnsEdit = (e) => {
        if (access && columnid && boardId) {
            EditColumn(access, title, columnid, boardId)
        }
        setEditableFields(false)
    }

    return (
        <div className='text-center  font-bold bg-[#EEF2F5] rounded-xl 
        m-3 flex-none w-[22%] md:w-[45%] sm:w-[90%]'>
            <div className='flex justify-around border-b border-[#9C528B]'>
                <input
                    className={`p-2  ${editableFields === true ? 'bg-white border'
                        : 'bg-transparent text-black'}  uppercase w-full !outline-none`}
                    readOnly={!editableFields}
                    onChange={(e) => setTitle(e.target.value)} value={title}
                />


                {!editableFields && <MdModeEdit size={'10%'} color='red'
                    className=' my-auto pr-2 ' onClick={() => makeEditable('column')} />}
                {editableFields && <button onClick={handleColumnsEdit}
                    className='size-4/4 bg-[#D7CDCC] border rounded-md px-1  '>
                    UPDATE
                </button>}
            </div>

            <Droppable droppableId={`${columnid}`}>
                {(provided, snapshot) => (
                    <div
                        className='min-h-[18px]'
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {/* provided task here to columns */}
                        {tasks && tasks?.map((oneTask, index) => (
                            <Card key={oneTask} task={oneTask} index={index} />
                        ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Columns