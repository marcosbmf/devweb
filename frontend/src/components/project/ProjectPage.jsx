import React from "react"
import { DragDropContext } from "react-beautiful-dnd"
import moment from 'moment'
import TaskList from "../task/TaskList.jsx"
import TaskModal from "../task/TaskModal.jsx"
import ProjectModal from './ProjectModal'
import "./ProjectPage.css"

const taskLists = (project, modalTeardown) => {
    return project.tasks.map((_, i) => <TaskList
            project={project}
            statusIndex={i}
            modalTeardown={modalTeardown}
        />)
}

const taskListsStyles = (project) => ({
    gridTemplateColumns: 'repeat(' + Object.keys(project.tasks).length + ', 1fr)'
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
                    <div><b>Deadline:</b> {moment(project.deadline).toISOString(false).slice(0, 10)}</div>
                    <div><ProjectModal edit={project} teardown={modalTeardown}/></div>
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