// src/components/Task.jsx
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

function Task({ task, onDelete, onToggle }) {
  const date = new Date(task.created_at).toLocaleString("en-US");
  const [showModal, setShowModal] = useState(false)

  const setModal = () =>{
    setShowModal(!showModal)
  }

  return (
    <div>
      {showModal?<Modal  closeModal={setModal} onDelete={onDelete} task={task} />:""}
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card-body">
        <h2 className="task-title">{task.title}</h2>
        <p className="task-content">{task.content}</p>
        <p className="task-date">📅 {date}</p>
      </div>

      <div className="task-actions">
        <label className="task-complete">
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggle(task.id, !task.completed)}
          />
          <span>Completed</span>
        </label>

        <div className="task-buttons">
          <Link to={`/edit-tasks/${task.id}/`} className="btn btn-edit">
            Edit
          </Link>
          <button className="btn btn-delete" onClick={() => setShowModal(true)}>Delete</button>
        </div>
      </div>
    </article>
    </div>
  );
}

export default Task;
