import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Project from "./components/Project";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      <h2> Welcome To Projects Page </h2>

      <Switch>
        <Route exact path="/">
          <Projects />
        </Route>
        <Route exact path="/project">
          <Project />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
