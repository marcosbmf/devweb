import React, { useState } from 'react'
import './TaskItem.css'
import {Draggable} from 'react-beautiful-dnd'
import TaskModal from './TaskModal'

const TaskItem = ({ task, index, project }) => {
    const [edit, setEdit] = useState(false)
    const setTrue = () => setEdit(true)
    const teardown = () => setEdit(false)
    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <li className='taskItem' 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={setTrue}
                >
                    {edit ? (<TaskModal 
                        edit={task}
                        project={project}
                        teardown={teardown}
                    />) : null}
                    <div className='name'>{task.name}</div>
                    <div className='description'>{task.description ? task.description : ''}</div>
                    <div className='deadline'>Deadline: {task.deadline}</div>
                </li>
            )}
        </Draggable>
    )
}

export default TaskItem