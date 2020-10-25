import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import TaskList from "../Task/TaskList.jsx"
import "./ProjectPage.css"

const taskLists = (props) => {
    return props.statusList.map(status => <TaskList key={status} name={status} tasks={props.tasks.filter(t => t.status === status)}/>)
}

const taskListsStyles = (project) => ({
    gridTemplateColumns: 'repeat(' + project.statusList.length + ', 1fr)'
})

const ProjectPage = ({
    props,
    setTasksOrder
}) => {
    return (
        <div className="container">
            <div className="header">
                <h1>{props.name}</h1>
                <div><b>Description:</b><span>{props.description}</span></div>
                <div><b>Deadline:</b> {(new Date(props.deadline)).toLocaleDateString()}</div>
            </div>
            <div className='footer'>
                <h3>Tasks:</h3>
                <DragDropContext onDragEnd={setTasksOrder}>
                    <div className="tasksLists" style={taskListsStyles(props)}>{taskLists(props)}</div>
                </DragDropContext> 
            </div>
        </div>
    )
}

export default ProjectPage;