import { useEffect, useState } from "react"
import api from "../api";
import Task from "../components/Task";



function CompletedTasks() 
{
    const[tasks,setTasks] = useState([]);



    useEffect(() =>{
        getCompletedTasks();
    }, []);


    const getCompletedTasks  = () =>{
        api.get("tasks/completed/")
        .then((res) =>{
            setTasks(res.data);
        }).catch((err) => alert(err));
    }
    
    const toggleCompleted = (id,completed) =>{
        api.patch(`tasks/${id}/` , {completed})
        .then((res) =>{
            if(res.status===200){
                setTasks(
                    tasks.map((task) =>
                        task.id ===id?{...task,completed}:task
                    )
                )
                getCompletedTasks();
            }
        }).catch((err) => alert(err));
    }

  return (
    <div className="tasks-page-root">
      <div className="tasks-container">
        <header className="tasks-header">
          <h1 className="tasks-title">Completed Tasks <span className="tasks-emoji">✅</span></h1>
        </header>

        <main className="tasks-grid">
          {tasks.length === 0 ? (
            <div className="no-tasks">There are no completed Tasks</div>
          ) : (
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onToggle={toggleCompleted}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
}


export default CompletedTasks