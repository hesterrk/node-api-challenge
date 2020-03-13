import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Projects() {


    const [projects, setProjects] = useState([]);

    useEffect(() => {
      //only works if you have npm run server!
      const getProjects = () => {
      axios.get('http://localhost:4000/api/projects')
      .then(res => {
        console.log(res);
        setProjects(res.data)
        console.log(projects)
      })
      .catch(err => {
        console.log(err);
      })
  
    }
  
    getProjects();
  
    }, [])
  return (
    <div>
      {projects.map(project => (
          
          <div>
          <p>{project.name}</p>
          <p>{project.completed}</p>
          </div>
          
  ))} 
    </div>
  );
}

export default Projects;
