import React, { useState } from 'react'
import Modal from 'react-modal'
import moment from 'moment'

import {
    updateProject
} from '../../services/api'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'lightskyblue'      
    }
};

const correctIndexes = project => {
    return {
        ...project,
        tasks: project.tasks.map(tl => ({
            ...tl,
            tasks: tl.tasks.map((t, i) => ({...t, order: i}))
        }))
    }
}

const createTask = (project, task) => {
    project.tasks[task.status].tasks.push(task)
    updateProject(project._id, correctIndexes(project))
}

const updateTask = (project, newTask, oldTask) => {
    return //TODO
    const oldIndex = project.tasks[oldTask.status].tasks.map(t => t._id).indexOf(oldTask._id)
    if(oldTask.status !== newTask.status) {
        project.tasks[oldTask.status].tasks.slice(oldIndex, 1)
        project.tasks[newTask.status].tasks.push(newTask)
    } else {
        project.tasks[oldTask.status].tasks[oldIndex] = newTask
    }
    updateProject(project._id, correctIndexes(project))
}

const deleteTask = (project, task) => {
    return //TODO
}

function TaskModal({teardown, project, edit}){
    const [modalIsOpen, setModalIsOpen] = useState(!!edit);
    const [task, setTask] = useState({
            name: "",
            deadline: moment().toISOString(true).slice(0, 10),
            description: "",
            status: 0,
            ...(edit || {})
        });

    const changeAttr = (event) => {
        let nam = event.target.name
        let val = event.target.value
        setTask({...task, [nam]: val})
    }

    const openModal = ()=>{
        setModalIsOpen(true)
    }

    const closeModal = ()=>{
        setModalIsOpen(false)
    }

    const save = () => {
        edit ? updateTask(project.id, task.id, task) : createTask(project, task)
        closeModal()
    }

    const deleteButton = () => {
        if (edit) deleteTask(project.id, task.id)
        closeModal()
    }

    return(
        <>
           {!edit ? <button onClick={openModal}>Add Task</button> : null}
           <Modal 
                isOpen={modalIsOpen} 
                style={customStyles}
                onAfterClose={teardown}
                ariaHideApp={false}
           >
                <p>{edit ? "EDIT" : "ADD" } TASK: </p>
                <form>
                    <div>
                        <label>Name: </label>
                        <input
                            type='text'
                            name='name'
                            value={task.name}
                            onChange={changeAttr}
                        />
                    </div>

                     <div>
                        <label>Deadline: </label>
                        <input
                            type='date'
                            name='deadline'
                            placeholder="dd-mm-yyyy"
                            value={moment(task.deadline).toISOString(true).slice(0, 10)}
                            onChange={changeAttr}
                        />
                    </div>

                    <div>
                        <label>Status: </label>
                        <select
                            type='text'
                            name='status'
                            value={task.status}
                            onChange={changeAttr}
                        >
                            {project.tasks.map((k, i) => (<option key={i} value={i}>{k.status}</option>))}
                        </select>
                    </div>

                    <div>
                        <p>Description: </p>
                        <textarea
                            type='text'
                            name='description'
                            value={task.description}
                            rows={5}
                            onChange={changeAttr}
                        />
                    </div>
             </form>

             <button onClick={save}>Save</button> {edit ? <button onClick={deleteButton}>Delete</button> : null} <button onClick={closeModal}>Close</button>
            </Modal>
        </>
    )
}

export default TaskModal