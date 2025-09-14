import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link ,} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TasksPage from "./pages/TasksPage";
import Register from "./pages/Register";
import { useEffect } from "react";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import CompletedTasks from "./pages/CompletedTasks";
import Navbar from "./components/Navbar"

function Logout() {
  localStorage.clear();
  return <Navigate to="/login/" replace />;
}

function RegisterAndLogout() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tasks-page/"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<RegisterAndLogout />} />
        <Route path="/logout/" element={<Logout />} />
        <Route path="/add-task/" element=
        <ProtectedRoute>
          {<AddTask />}
        </ProtectedRoute> />
        <Route path="/edit-tasks/:id/" element=
        <ProtectedRoute>
          {<EditTask />}
        </ProtectedRoute> />
        <Route path="/completed-tasks/" element=
        <ProtectedRoute>
          {<CompletedTasks />}  
        </ProtectedRoute> />
      </Routes>
    </BrowserRouter>
  );
}

export default App
