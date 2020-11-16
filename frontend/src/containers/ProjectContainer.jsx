import React, { useState } from 'react'
import ProjectPage from '../components/project/ProjectPage'

// Change tasks order
const changeOrder = (result, project) => {
    const src = result.source
    const dst = result.destination
    const tasksList = project.statusList.reduce((acc, s) => ({...acc, [s]: project.tasks.filter(t => t.status === s)}), {})

    tasksList[dst.droppableId].splice(dst.index, 0, tasksList[src.droppableId][src.index])
    tasksList[src.droppableId].splice(src.index, 1)
    tasksList[dst.droppableId][dst.index].status = dst.droppableId

    return {...project, tasks: project.statusList.reduce((acc, k) => [...acc, ...tasksList[k]], [])}
}

const ProjectContainer = ({
    props,
    setTasksOrder
}) => {
    const [project, setProject] = useState(props)

    const createTask = (task) => {
        setProject({project, tasks: [...project.tasks, task]})
    }

    // Executed at the end of a drag.
    const onDragEnd = (result) => {
        console.log(result)
        if (result.destination != null) {
            setProject(changeOrder(result, project))
        }
    }

    return (
        <ProjectPage 
            project={project} 
            setTasksOrder={onDragEnd}
        />
    )
}

export default ProjectContainer;