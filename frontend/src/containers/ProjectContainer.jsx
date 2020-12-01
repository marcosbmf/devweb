import React, { useState, useEffect } from 'react'
import ProjectPage from '../components/project/ProjectPage'

import {
    getProject,
    updateProject,
} from '../services/api'

//Correction of indexes
const correctIndexes = project => {
    return {
        ...project,
        tasks: project.tasks.map(tl => ({
            ...tl,
            tasks: tl.tasks.map((t, i) => ({...t, order: i}))
        }))
    }
}

// Change tasks order
const changeOrder = (result, project) => {
    const status = {
        "TODO": 0,
        "DOING": 1,
        "DONE": 2
    }
    const src = result.source
    const dst = result.destination
    console.log(status[src.droppableId],  project.tasks[status[src.droppableId]])

    const movedEl = project.tasks[status[src.droppableId]].tasks.splice(src.index, 1)[0]
    console.log(movedEl)
    project.tasks[status[dst.droppableId]].tasks.splice(dst.index, 0, movedEl)
    
    return correctIndexes(project)
}

const ProjectContainer = (
    props
) => {
    const pid = props.match.params.id
    const [proj, setProj] = useState(null)

    const getData = async () => {
        const req = await getProject(pid);
        if (req.status === 200) {
            setProj({...(req.data.data || {})})
        }
    }

    useEffect(() => getData(), [])

    // Executed at the end of a drag.
    const onDragEnd = async (result) => {
        if (result.destination != null) {
            await updateProject(pid, changeOrder(result, proj))
            await getData()
        }
    }

    const render = proj ? (<ProjectPage 
        project={proj}
        modalTeardown={getData}
        setTasksOrder={onDragEnd}
    />) : <h1>No Project Found</h1>

    return render
}

export default ProjectContainer;