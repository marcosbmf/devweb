import React, { useState, useEffect } from 'react'
import ProjectListingPage from '../components/project/ProjectListingPage'

import {
    listProjects
} from '../services/api'

const ProjectListingContainer = (props) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        (async () => {
            const req = await listProjects();
            if (req.status === 200) {
                setProjects(req.data || [])
            }
        })()
    }, [])
    
    return (
        <ProjectListingPage projects={projects}/>
    )
}

export default ProjectListingContainer