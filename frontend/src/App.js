import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/common/Navbar/navbar';
import ProjectContainer from './containers/ProjectContainer'
import ProjectListingContainer from './containers/ProjectListContainer'

function App() {
  return (
    <BrowserRouter>
        <NavBar></NavBar>
        <Switch>
          <Route path="/" exact component={ProjectListingContainer}/>
          <Route path="/project/:id" exact component={ProjectContainer}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
