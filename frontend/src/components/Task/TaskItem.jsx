import React from 'react'
import './TaskItem.css'
import {Draggable} from 'react-beautiful-dnd'

const TaskItem = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <li className='taskItem' 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className='name'>{task.name}</div>
                    <div className='description'>{task.description ? task.description : ''}</div>
                    <div className='deadline'>Deadline: {task.deadline}</div>
                </li>
            )}
        </Draggable>
    )
}

export default TaskItem