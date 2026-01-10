import { useEffect, useState } from "react";
import "./To-do.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // fetch all tasks on load
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // add task
  const addTask = () => {
    if (!input.trim()) return;

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => [...prev, newTask]);
        setInput("");
      });
  };

  // toggle done / undone
  const toggleTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prev =>
          prev.map(task =>
            task.id === id ? updatedTask : task
          )
        );
      });
  };

  // delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTasks(prev => prev.filter(task => task.id !== id));
    });
  };

  return (
    <div className="task-manager">
      <h2>Tasks</h2>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "done" : "undone"}>
                {task.name}
              </span>
            </label>
            <button onClick={() => deleteTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
