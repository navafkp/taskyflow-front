import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import OneCard from './OneCard';

const Card = ({ task, index }) => {
    const [showModal, setShowModal] = useState(false)


    return (
        <div>
            {/* Creating Draggable cards */}
            <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        {/* cards details here and more info modal when click the event */}
                        <div
                            onClick={() => setShowModal(true)}
                            style={{ backgroundColor: task.color }}
                            // className={`h-32 ${task.color? `bg-${task.color}`: ''} uppercase rounded-xl px-4 py-7 text-sm m-3`}>
                            className={` h-32 uppercase rounded-xl px-4 py-7 text-sm m-3`}>
                            <p className=' mb-3 w-fit bg-green-500 rounded-e-xl 
                             lowercase px-1 text-sm font-thin  text-white '>
                                {task.priority}
                            </p>
                            <h3>{task.title}</h3>

                            {new Date(task.created_at).toLocaleDateString()}
                        </div>

                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
            {showModal && <OneCard task={task} closeModal={() => setShowModal(false)} />}
        </div>
    )
}
export default Card