import React, { useState } from "react";
import "./LoginForms.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import jwt from "jsonwebtoken";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
        console.log(response);
      const user = response.data.find((userData)=>userData.name === name && userData.password === password);
        if (user) {
        console.log("Login successful");

         // Generate JWT token
        //  const token = jwt.sign({ name: user.name }, "05kfn503n59g04n959rnfir", {
        //   expiresIn: "1h", // Token expiry time
        // });

        // // Store the token in local storage
        // localStorage.setItem("jwtToken", token);

        // Redirect to the homepage or any other desired page
        navigate("/home", {state: {username: name}});
      } else {
        console.error("Login failed");
        // Handle login failure, e.g., show an error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error, e.g., show an error message
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div id="loginCard" className="bg">
      <h1>Login</h1>
      <div id="inputs" className="p-4 mx-16 space-y-4">
        <input
          placeholder="Name"
          className="block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia Input"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Password"
          className="block h-12 bg-black rounded-lg border-2 border-white focus:outline-none focus:ring focus:ring-nvidia Input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="p-4 mx-16 space-y-4">
        <button className="inline-block w-32 h-12 rounded-lg login" onClick={handleLogin}>
          Login
        </button>
        <button className="inline-block w-32 h-12 rounded-lg signup" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;