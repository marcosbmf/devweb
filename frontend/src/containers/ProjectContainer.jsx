import React, { useState } from 'react'
import ProjectPage from '../components/project/ProjectPage'

const ProjectContainer = ({
    props,
    setTasksOrder
}) => {
    const [project, setProject] = useState(props)

    const onDragEnd = (result) => {
        console.log(result)
    }

    return (
        <ProjectPage props={project} setTasksOrder={onDragEnd}/>
    )
}

export default ProjectContainer;