import React from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom"
import Logo from "../Assets/planet.png"

const Navbar = () => {
  const navigate=useNavigate()
  //display in body
  const auth= localStorage.getItem("user")
   const display = JSON.parse(auth);
  const logout=()=>{
    localStorage.clear()
    navigate("/signup")
    console.log("Test")
  }

  return (
    <div>
      <img src={Logo} className="w-5 h-5 float-left absolute ml-5" />
      {auth ? (
        <ul className="flex justify-center gap-x-5 text-white bg-blue-400">
          <li>
            <Link className="hover:text-black " to="/">
              Products
            </Link>
          </li>
          <li>
            <Link className="hover:text-black" to="/add">
              Add Product
            </Link>
          </li>
          <li>
            <Link className="hover:text-black" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link onClick={logout} className="hover:text-black" to="/signup">
              Logout
            </Link>
          </li>
          <li className='font-bold text-red-300'>({JSON.parse(auth).name})</li>
        </ul>
      ) : (
        <ul className="flex justify-end gap-x-5 px-5 text-white bg-blue-400">
          <li>
            <Link className="hover:text-black" to="/signup">
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-black flex-cols items-center ml-4"
              to="/login"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar