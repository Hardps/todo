import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";
import { useNavigate } from "react-router-dom";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            console.log(username);
            const response = await axios.post('http://localhost:4000/getTasks', {username});
            console.log("Response is ", response);
            setTasks(response.data);
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        };
    
        fetchTasks();
      }, [username]);

      const addTodo = () => {
        navigate("/Todo");
      }

  return (
    <div className="bg">
        <Todo
        todos={todos}/>
        <button onClick={addTodo} className="inline-block w-32 h-12 bg-green-500 rounded-lg login">
            Add ToDo
          </button>
    </div>
  )
}

export default Home
