import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import TaskList from "../Task/TaskList.jsx"
import TaskModal from "../Task/TaskModal.jsx"
import "./ProjectPage.css"

const taskLists = (project) => {
    return project.statusList.map(status => <TaskList
            project={project}
            key={status}
            name={status}
            tasks={project.tasks.filter(t => t.status === status)}
        />)
}

const taskListsStyles = (project) => ({
    gridTemplateColumns: 'repeat(' + project.statusList.length + ', 1fr)'
})

const ProjectPage = ({
    project,
    setTasksOrder
}) => {
    return (
        <div className="container">
            <div className="header">
                <h1>{project.name}</h1>
                <div><b>Description:</b><span>{project.description}</span></div>
                <div><b>Deadline:</b> {(new Date(project.deadline)).toLocaleDateString()}</div>
            </div>
            <div className='footer'>
                <h3>Tasks:</h3>
                <TaskModal 
                    project={project}
                ></TaskModal>
                <DragDropContext onDragEnd={setTasksOrder}>
                    <div className="tasksLists" style={taskListsStyles(project)}>{taskLists(project)}</div>
                </DragDropContext> 
            </div>
        </div>
    )
}

export default ProjectPage;