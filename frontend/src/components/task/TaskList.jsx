import React from "react"
import TaskItem from "./TaskItem"
import { Droppable } from "react-beautiful-dnd"
import './TaskList.css'

const TaskList = ({statusIndex, project, modalTeardown}) => {
    const taskList = project.tasks[statusIndex]
    return (
            <figure className='taskList'>
                <figcaption>{taskList.status}</figcaption>
                <Droppable droppableId={taskList.status}>
                    {provided => (
                        <ul
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            {taskList.tasks.map((t, i) => <TaskItem 
                                key={t.id} 
                                task={{...t, status: statusIndex}} 
                                index={i} 
                                project={project} 
                                modalTeardown={modalTeardown}      
                            />)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </figure>    
        
    );
}

export default TaskList