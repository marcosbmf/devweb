import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
    listProjects
} from '../../services/api'

const makeListItems = (projects) => projects.map(p => (
    <li>
       <div><Link to={'/project/' + p.id}>{p.name}</Link></div>

    </li>
))

const ProjectListingPage = ({projects}) => {
    return (
        <div>
            <h1>Project List</h1>
            <ul>
                {makeListItems(projects)}
            </ul> 
        </div>
    )
}

export default ProjectListingPage