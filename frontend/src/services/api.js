import ProjectMock from '../ProjectMock'

const projectIndex = (pid) => ProjectMock.map(p => p.id).indexOf(pid)
const taskIndex = (tid, project) => project.tasks.map(t => t.id).indexOf(tid)

export const listProjects = ProjectMock
export const getProject = (pid) => ProjectMock[projectIndex(pid)]

export const updateProject = (pid, project) => {
    const index = projectIndex(pid)
    ProjectMock[index] = project
}

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