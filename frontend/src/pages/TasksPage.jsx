import { useState, useEffect } from "react";

function TasksPage() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');

   useEffect(() => {
      const fetchTask = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const data = await response.json();
        setTask(data);
      };

      fetchTask();
    }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTask,
      }),
    });

    const createdTask  = await response.json();
    setTask((prevTasks) => [...prevTasks, createdTask]);
    setNewTask('');
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');

    await fetch(`http://localhost:3000/api/tasks/${taskId}`,{
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTask((prevTasks) => 
      prevTasks.filter((task) => task.id !==taskId)  
    );
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    const token = localStorage.getItem('token');

    const newStatus = currentStatus === 'done' ? 'todo' : 'done';

    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const updatedTask = await response.json();

    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };



  return (
    <div>
      <button onClick={handleLogout}>Odhlásit</button>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.status === "done"}
              onChange={() => handleToggleTask(task.id, task.status)}
            />
            <div>
              Název: {task.title}
            </div>
            <div>
              Popis: {task.description}
            </div>
            <div>
              Stav: {task.status}
            </div>
            <div>
              Datum vytvoření: {task.createdAt}
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Smazat úkol</button>
          </li>
        ))}
      </ul>
      <h2>
        Přidat nový úkol
      </h2>
      <input
        type="text"
        placeholder="new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Přidat</button>
    </div>
  );
}

export default TasksPage;
