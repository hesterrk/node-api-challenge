import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div `
border: 3px solid #4389A2;
padding: .5rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;

`


function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //only works if you have npm run server!
    const getProjects = () => {
      axios
        .get("http://localhost:4000/api/projects")
        .then(res => {
          console.log(res);
          setProjects(res.data);
          console.log(projects);
        })
        .catch(err => {
          console.log(err);
        });
    };

    getProjects();
  }, []);
  return (
    <Div>
      {projects.map(project => (
        <Link to={`/${project.id}`} style={{ textDecoration: "none"}} key={project.id}>
          <div>
            <p>{project.name}</p>
            <p>{project.completed}</p>
          </div>
        </Link>
      ))}
    </Div>
  );
}

export default Projects;
