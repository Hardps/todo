import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import {SignUp} from "./components/SignUp"
import Todo from './components/TodoList';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/ToDo" element={<Todo/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
      {/* <Login/> */}
    </div>
  );
}

export default App;