import React, { useState } from 'react'
import Modal from 'react-modal'
import moment from 'moment'

import {
    addTask,
    updateTask,
    deleteTask
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

function TaskModal({teardown, project, edit}){
    const [modalIsOpen, setModalIsOpen] = useState(!!edit);
    const [task, setTask] = useState({
            name: "",
            deadline: moment().toISOString(true).slice(0, 10),
            description: "",
            status: "TODO",
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
        edit ? updateTask(project.id, task.id, task) : addTask(project.id, task)
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
                            value={task.deadline}
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
                            {project.statusList.map(k => (<option value={k}>{k}</option>))}
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