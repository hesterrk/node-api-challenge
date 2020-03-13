import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
  border: 3px solid #4389a2;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  font-family: monospace;
`;

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
        <Link
          to={`/${project.id}`}
          style={{ textDecoration: "none" }}
          key={project.id}
        >
          <div>
            <p> 📝 {project.name}</p>
            <p> {project.completed}</p>
          </div>
        </Link>
      ))}
    </Div>
  );
}

export default Projects;
