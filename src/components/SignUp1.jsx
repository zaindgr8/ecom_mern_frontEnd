import React from "react";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5005/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  //  const collectData = async () => {
  //    const response = await axios.post("http://localhost:5005/register", {
  //      name,
  //      email,
  //      password,
  //    });
  //    console.log(response.data);
  //  };

  return (
    <div className="flex gap-x-5 py-5 items-center justify-center">
      <h1 className="font-bold">Register </h1>
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
      <button
        onClick={collectData}
        className="bg-blue-400 text-white p-1 rounded-lg hover:bg-blue-300"
      >
        Submit
      </button>
    </div>
  );
};

export default Signup;
