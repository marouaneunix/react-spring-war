import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

interface Task {
  name:string,
  cron:string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await axios.get('/api/tasks');
      setTasks(fetchedTasks.data);
    };
    getTasks();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          {
            tasks.map(task => <p>{task.name} {task.cron}</p>)
          }
        </a>
      </header>
    </div>
  );
}

export default App;
