import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectContainer from './containers/ProjectContainer'
import mock from "./ProjectMock.json"

function App() {
  return (
    <div className="App">
      <ProjectContainer props={mock[1]}/>
    </div>
  );
}

export default App;
