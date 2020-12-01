import React, { useState } from 'react'
import moment from 'moment'
import './TaskItem.css'
import {Draggable} from 'react-beautiful-dnd'
import TaskModal from './TaskModal'

const taskColor = (task) => {
    const daysLeft = moment(task.deadline).diff(moment(), "days")
    if (daysLeft >= 5 || task.status === 2) {
        return "green"
    } else if (daysLeft < 0) {
        return "red"
    }
    return "#FFDC00"
}

const TaskItem = ({ task, project, modalTeardown }) => {
    const [edit, setEdit] = useState(false)
    const setTrue = () => setEdit(true)
    const teardown = () => {
        setEdit(false)
        modalTeardown()
    }
    const style = {
        backgroundColor: taskColor(task),
        borderStyle: "solid"
    }

    return (
        <Draggable draggableId={task._id} index={task.order}>
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
                    <div className='name' style={style}>{task.name}</div>
                    <div className='description'>Description: {task.description ? task.description : ''}</div>
                    <div className='deadline'>Deadline: {moment(task.deadline).toISOString(false).slice(0, 10)}</div>
                </li>
            )}
        </Draggable>
    )
}

export default TaskItem