import React, { useState, useEffect } from 'react'
import ProjectListingPage from '../components/project/ProjectListingPage'

import {
    listProjects
} from '../services/api'

const ProjectListingContainer = (props) => {
    const [projects, setProjects] = useState([])

    const getData = async () => {
        const req = await listProjects();
        if (req.status === 200) {
            setProjects(req.data || [])
        }
    }

    useEffect(() => {
        getData()
    }, [])
    
    return (
        <ProjectListingPage projects={projects} teardown={getData}/>
    )
}

export default ProjectListingContainer