import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const navigate=useNavigate()

    useEffect(()=>{
        const auth= localStorage.getItem("user")
        if(auth){
            navigate("/")
        }
    })

    //Login API
    const handleLogin=async ()=>{
     const response = await axios.post("http://localhost:5005/login", {
       email,
       password,
     });
     let result= response.data
     console.log(result)
     if(result.name){
        localStorage.setItem("user", JSON.stringify(result))
        navigate("/")
     }
     else{
        alert("Enter Correct Details")
     }
    }

  return (
    <div className="flex gap-x-5 py-5 items-center justify-center">
      <h1 className="font-bold">Login</h1>
      <input
      value={email}
        onChange={(e)=>setEmail(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Email"
      />
      <input
      value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Password"
      />
      <button
      onClick={handleLogin}
        className="bg-blue-400 text-white p-1 rounded-lg hover:bg-blue-300"
      >
        Submit
      </button>
    </div>
  );
}

export default Login