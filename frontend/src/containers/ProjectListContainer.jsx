import React, { useState } from 'react'
import ProjectListingPage from '../components/project/ProjectListingPage'

import {
    listProjects
} from '../services/api'

const ProjectListingContainer = (props) => {
    const [projects, setProjects] = useState(listProjects())
    
    return (
        <ProjectListingPage projects={projects}/>
    )
}

export default ProjectListingContainer