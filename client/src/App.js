import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [projects, setProjects] = useState();

  useEffect(() => {

    //only works if you have npm run server!
    axios.get('http://localhost:4000/api/projects')
    .then(res => {
      console.log(res);
      setProjects(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="App">
      <h2> List of Your Projects </h2>


     
    </div>
  );
}

export default App;
