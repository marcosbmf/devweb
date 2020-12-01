import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import NavBar from '../common/Navbar/navbar'
import TaskList from "../task/TaskList.jsx"
import TaskModal from "../task/TaskModal.jsx"
import "./ProjectPage.css"

const taskLists = (project, modalTeardown) => {
    return project.statusList.map(status => <TaskList
            project={project}
            key={status}
            name={status}
            modalTeardown={modalTeardown}
            tasks={project.tasks.filter(t => t.status === status)}
        />)
}

const taskListsStyles = (project) => ({
    gridTemplateColumns: 'repeat(' + project.statusList.length + ', 1fr)'
})

const ProjectPage = ({
    project,
    modalTeardown,
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
                    teardown={modalTeardown}
                ></TaskModal>
                <DragDropContext onDragEnd={setTasksOrder}>
                    <div className="tasksLists" style={taskListsStyles(project)}>{taskLists(project, modalTeardown)}</div>
                </DragDropContext> 
            </div>
        </div>
    )
}

export default ProjectPage;