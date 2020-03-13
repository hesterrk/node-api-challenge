import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

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
    <div className="App">
      <h2> List of Your Projects </h2>
     
         {projects.map(project => (
          <div>
          <p>{project.name}</p>
          <p>{project.completed}</p>
          </div>
          
  ))} 
     


     
    </div>
  );
}

export default App;
