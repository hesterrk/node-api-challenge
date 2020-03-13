import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Project() {
  const [project, setProject] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProject = () => {
      axios
        .get(`http://localhost:4000/api/projects/${id}`)
        .then(res => {
          console.log(res);
          setProject(res.data);
          console.log(project);
        })
        .catch(err => {
          console.log(err);
        });
    };

    getProject();
  }, [id]);

  return (
    <div>
      <Link to={"/"}>
        <button>Back to Projects</button>
      </Link>
      <h3> This Project: </h3>

    
        <div>
          <p> 📝 {project.name}</p>
          <p> {project.completed}</p>
        </div>
      
    </div>
  );
}

export default Project;
