import Axios from 'axios';

const Api = Axios.create({
  baseURL: 'http://localhost:2500'
});

export const listProjects = () => Api.get('/project')
export const getProject = (pid) => Api.get('/project/' + pid)
export const createProject = (project) => Api.post('/project', project)
export const updateProject = (pid, project) => Api.put('/project/' +  pid, project)
export const deleteProject = (pid) => Api.delete('/project/' + pid)