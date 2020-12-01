import React, { useState } from 'react'
import moment from 'moment'
import './TaskItem.css'
import {Draggable} from 'react-beautiful-dnd'
import TaskModal from './TaskModal'

const TaskItem = ({ task, project, modalTeardown }) => {
    const [edit, setEdit] = useState(false)
    const setTrue = () => setEdit(true)
    const teardown = () => {
        setEdit(false)
        modalTeardown()
    }

    return (
        <Draggable draggableId={""+task._id} index={task.order}>
            {provided => (
                <li className='taskItem' 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={setTrue}
                >
                    {edit ? (<TaskModal 
                        edit={{...task}}
                        project={project}
                        teardown={teardown}
                    />) : null}
                    <div className='name'>{task.name}</div>
                    <div className='description'>{task.description ? task.description : ''}</div>
                    <div className='deadline'>Deadline: {moment(task.deadline).toISOString(true).slice(0, 10)}</div>
                </li>
            )}
        </Draggable>
    )
}

export default TaskItem