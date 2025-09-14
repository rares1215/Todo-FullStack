import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function Form({ route, method }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const name = method === "login" ? "Login" : "Register";
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        if (res.data.access && res.data.refresh) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          navigate("/tasks-page/");
          setIsLoading(false);
        }
      } else {
        navigate("/login/");
        setUserName("");
        setPassword("");
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      alert(`${name} failed!`);
      setIsLoading(false);
    }
  };

  return (
<div className="Auth-Form">
<div className=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={handleAuth}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">{method==="login"? "Sign in to your your to do list!": "Make an account!"}</h5>
        <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
            <input 
            type="text" 
            name="username" 
            id="username" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            placeholder="username123" 
            required 
            onChange={(e) => setUserName(e.target.value)} 
            value={username} 
            autoComplete="off" />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="••••••••" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            required 
            autoComplete="off" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            />
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{method==="login"?"Login to your account":"Register Account"}</button>
        {method==="login"?<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <Link to="/register/"  className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
        </div>:""}
        {isLoading?<LoadingSpinner />:""}
    </form>
</div>
</div>
  );
}

export default Form;
