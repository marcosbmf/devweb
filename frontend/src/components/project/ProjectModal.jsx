import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal'
import moment from 'moment'

import {
    createProject,
    deleteProject,
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

function ProjectModal({ teardown, edit}){
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [project, setProject] = useState({
            name: "",
            deadline: moment().toISOString(false).slice(0, 10),
            description: "",
            ...(edit || {})
        });

    const changeAttr = (event) => {
        let nam = event.target.name
        let val = event.target.value
        setProject({...project, [nam]: val})
    }

    const openModal = ()=>{
        setModalIsOpen(true)
    }

    const closeModal = ()=>{
        setModalIsOpen(false)
        if (teardown) {
            teardown()
        }
    }

    const save = async () => {
        edit ? await updateProject(project._id, project) : await createProject(project)
        closeModal()
    }

    const deleteButton = async () => {
        if (edit) await deleteProject(project._id)
        closeModal()
        history.push('/')
    }

    return(
        <>
           <button onClick={openModal}>{edit ? "Edit" : "Add" } Project</button>
           <Modal 
                isOpen={modalIsOpen} 
                style={customStyles}
                onAfterClose={teardown}
                ariaHideApp={false}
           >
                <p>{edit ? "EDIT" : "ADD" } PROJECT: </p>
                <form>
                    <div>
                        <label>Name: </label>
                        <input
                            type='text'
                            name='name'
                            value={project.name}
                            onChange={changeAttr}
                        />
                    </div>

                     <div>
                        <label>Deadline: </label>
                        <input
                            type='date'
                            name='deadline'
                            placeholder="dd-mm-yyyy"
                            value={moment(project.deadline).toISOString(false).slice(0, 10)}
                            onChange={changeAttr}
                        />
                    </div>

                    <div>
                        <p>Description: </p>
                        <textarea
                            type='text'
                            name='description'
                            value={project.description}
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

export default ProjectModal