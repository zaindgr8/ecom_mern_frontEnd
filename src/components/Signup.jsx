import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';

const Signup = () => {
    //Registration States
    const [name, setName]= useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    //Navigation
    const navigate=useNavigate()

    useEffect(()=>{
      const auth= localStorage.getItem("user")
        if(auth){
            navigate("/")
        }
    })

//Axios Api Call
   const collectData = async () => {
     try {
       const response = await axios.post("http://localhost:5005/register", {
         name,
         email,
         password,
       });

       let result = response.data;

       if (result) {
         localStorage.setItem("user", JSON.stringify(result.result));
         localStorage.setItem("token", JSON.stringify(result.token));
         navigate("/");
       }

       console.log(response.data);
     } catch (error) {
       console.error("Error during registration:", error);
     }
   }

    
  return (
    <div className="flex gap-x-5 py-5 items-center justify-center">
      <h1 className="font-bold">Register</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Password"
      />
      <button onClick={collectData} className='bg-blue-400 text-white p-1 rounded-lg hover:bg-blue-300'>Submit</button>
    </div>
  )
}

export default Signup