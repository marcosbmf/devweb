import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./components/ProjectCard"
import ProjectCard from './components/ProjectCard';

var ProjectSchema =  {  
  name: "DevWebSemanal",
  description: "Tarefa semanal de dev web: https://github.com/matheusgr/devweb",
  deadline: Date.now(),
  tasks: [
    {name: "Task 1"},
    {name: "Task 2"},
    {name: "Task 3"},
    {name: "Task 4"}  
  ],
  user: {
      name: "Marcos",
  }
}

function App() {
  return (
    <div className="App">
      <ProjectCard props={ProjectSchema}/>
    </div>
  );
}

export default App;
