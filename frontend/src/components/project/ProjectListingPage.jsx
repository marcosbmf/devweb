import React from 'react'
import { Link } from 'react-router-dom'
import ProjectModal from './ProjectModal'

const makeListItems = (projects) => projects.map(p => (
    <li key={p._id}>
       <div><Link to={'/project/' + p._id}>{p.name}</Link></div>
    </li>
))

const ProjectListingPage = ({projects, teardown}) => {
    return (
        <div>
            <h1>Project List</h1>
            <ProjectModal teardown={teardown}/>
            <ul>
                {makeListItems(projects)}
            </ul> 
        </div>
    )
}

export default ProjectListingPage