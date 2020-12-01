import React, { useState, useEffect } from 'react'
import ProjectPage from '../components/project/ProjectPage'

import {
    getProject,
    updateProject,
} from '../services/api'

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

const ProjectContainer = (
    props
) => {
    const pid = props.match.params.id
    const [proj, setProj] = useState(null)

    const getData = async () => {
        const req = await getProject(pid);
        if (req.status === 200) {
            setProj(req.data.data || [])
        }
        console.log(proj, pid)
    }

    useEffect(() => {
        getData()
    }, [])

    const refreshPage = () => {
        getData()
    }

    // Executed at the end of a drag.
    const onDragEnd = (result) => {
        console.log(result)
        refreshPage()
        return
        if (result.destination != null) {
            updateProject(proj.id, changeOrder(result, proj))
            refreshPage()
        }
    }

    const render = proj ? (<ProjectPage 
        project={proj}
        modalTeardown={refreshPage}
        setTasksOrder={onDragEnd}
    />) : <h1>No Project Found</h1>

    return render
}

export default ProjectContainer;