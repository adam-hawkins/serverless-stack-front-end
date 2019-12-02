import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import "./App.css";

function App(props) {
  return (
    <div className="App container">
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar>
      <Routes />
    </div>
  );
}

export default App;
