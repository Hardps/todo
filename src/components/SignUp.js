import React, { useRef } from "react";
import "./LoginForms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  
  const handleSignUp = async () => {
    const username = nameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("http://localhost:4000/register", { name: username, password: password });

      alert("User registered successfully!");
      navigate("/");
      // Handle successful registration, e.g., show a success message, redirect, etc.
    } catch (error) {
      alert("Error registering user");
      // Handle registration error, e.g., show an error message
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div id="loginCard" className="bg">
      <h1>Sign Up</h1>
      <div id="inputs" className="p-4 mx-16 space-y-4">
        <input placeholder="Name" className="block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia Input" ref={nameRef} />
        <input
          placeholder="Password"
          className="block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia Input"
          ref={passwordRef}
        />
      </div>
      <div className="p-4 mx-16 space-y-4">
          <button className="inline-block w-32 h-12 bg-green-500 rounded-lg login" onClick={handleLogin}>
          Login
        </button>
        <button className="inline-block w-32 h-12 bg-green-500 rounded-lg signup" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export { SignUp };