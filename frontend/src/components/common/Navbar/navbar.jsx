import React from "react";
import "./navbar.css";

const NavBar = (props) => {
  return (
    <header>
      <div className="navbar">
      <h3>PLAN-ME: Project Planner</h3>
        <div className="buttons">
          <a href="/">Home</a>
        </div>
      </div>
    </header>
  )
}

export default NavBar;