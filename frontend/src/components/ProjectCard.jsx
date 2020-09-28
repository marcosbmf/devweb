import React from "react"
import "./ProjectCard.css"

const TaskList = ({tasks}) => {
    const listItems = tasks.map( task => {
        return <li><span>{task.name}</span> <input type="checkbox"></input></li>
    });
    return (
        <div id="checkboxes">
            <ul>{listItems}</ul>
        </div>
    );
}

const ProjectCard = ({props}) => {
    const date = new Date(props.deadline)
    return (
        <div class="container">
            <h1>{props.name}</h1>
            <div><b>Description:</b><span>{props.description}</span></div>
            <div><b>Deadline:</b> {date.toLocaleDateString()}</div>
            <div>
                <h3>Tasks:</h3>
                <TaskList tasks={props.tasks}/>
            </div>
        </div>
    )
}

export default ProjectCard;