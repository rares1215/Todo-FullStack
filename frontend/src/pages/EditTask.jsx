import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import AddTask from "./AddTask";



function EditTask() 
{
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();


    useEffect(() =>{
        api.get(`tasks/${id}/`)
        .then((res) =>{
            setTitle(res.data.title);
            setContent(res.data.content);
        }).catch((err) =>alert(err));
    },[id])


    const editTask = (e) =>{
        e.preventDefault();
        api.put(`tasks/${id}/`, {title,content})
        .then((res) =>{
            if(res.status<300) {
                console.log("Modified Task");
                navigate("/tasks-page/");
            }
            else alert("Something went wrong!")
        }).catch((err) => alert(err));
    }


    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold text-indigo-600 mb-6">Edit Task</h1>
    <form className="space-y-4" onSubmit={editTask}>
      <input
        type="text"
        placeholder="Enter title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
      />
      <textarea
        placeholder="Enter content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        rows="8"
      />
      <button
        type="submit"
        className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Save
      </button>
    </form>
  </div>
</div>
    )
}

export default EditTask;