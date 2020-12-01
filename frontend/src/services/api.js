import Axios from 'axios';
import ProjectMock from './ProjectMock'

const Api = Axios.create({
  baseURL: 'http://localhost:2500'
});

const projectIndex = (pid) => ProjectMock.map(p => p.id).indexOf(pid)
const taskIndex = (tid, project) => project.tasks.map(t => t.id).indexOf(tid)

export const listProjects = () => Api.get('/project')
export const getProject = (pid) => Api.get('/project/' + pid)
export const createProject = (project) => Api.get('/project', project)
export const updateProject = (pid, project) => Api.put('/project/' +  pid, project)
export const deleteProject = (pid) => Api.delete('/project/' + pid)

export const getTask = (pid, tid) => {
    const proj = getProject(pid)
    return proj.tasks[taskIndex(tid, proj)]    
}

export const addTask = (pid, task) => {
    const proj = getProject(pid)
    proj.tasks.push({
        id: ~~(Math.random() * 100000),
        ...task
    })
}

export const deleteTask = (pid, tid) => {
    const proj = getProject(pid)
    const index = taskIndex(tid, proj)
    proj.tasks.splice(index, 1)
}

export const updateTask = (pid, tid, task) => {
    const proj = getProject(pid)
    const index = taskIndex(tid, proj)
    proj.tasks[index] = task
}