// src/pages/TasksPage.jsx
import { useEffect, useState } from "react";
import api from "../api";
import Task from "../components/Task";
import { useNavigate } from "react-router-dom";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    api
      .get("tasks/")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load tasks");
      });
  };

  const deleteTask = (id) => {
    api
      .delete(`tasks/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          getTasks();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete");
      });
  };

  const toggleTask = (id,completed) =>{
    api.patch(`tasks/${id}/`, {completed})
    .then((res) =>{
        if (res.status ===200){
            setTasks(
                tasks.map((task) =>
                    task.id===id?{...task,completed}:task
                )
            )
            getTasks();
        }
    }).catch((err) => alert(err));
  }

  return (
    <div className="tasks-page-root">
      <div className="tasks-container">
        <header className="tasks-header">
          <h1 className="tasks-title">Your Tasks <span className="tasks-emoji">✅</span></h1>
          <button
            className="add-btn"
            onClick={() => navigate("/add-task/")}
            aria-label="Add Task"
          >
            ➕ Add
          </button>
        </header>

        <main className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="no-tasks">No tasks yet — add your first one!</div>
          ) : (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggle={toggleTask}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default TasksPage;
