import React from "react"
import TaskItem from "./TaskItem"
import { Droppable } from "react-beautiful-dnd"
import './TaskList.css'

const TaskList = ({name, tasks}) => {
    return (
        
            <figure className='taskList'>
                <figcaption>{name}</figcaption>
                <Droppable droppableId={name}>
                    {provided => (
                        <ul
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            {tasks.map((t, i) => <TaskItem key={t.id} task={t} index={i}/>)}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </figure>    
        
    );
}

export default TaskList