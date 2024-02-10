import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName]= useState("")
    const [price, setPrice]=useState("")
    const [category, setCategory]=useState("")
    const [company, setCompany]=useState("")
    const [error, setError]=useState(false)
    const navigate=useNavigate()

     const auth = localStorage.getItem("user");
     let display = JSON.parse(auth);
    
    // const addCategory=async ()=>{
    //     console.log(!name)
    //     if(!name || !price || !category || !company){
    //         setError(true)
    //         return false
    //     }
    //     // console.log(name, price, category, company)
    //     const response = await axios.post("http://localhost:5005/add-product", {
    //       name,
    //       price,
    //       category,
    //       company,
    //     })

    //   //For User Id
    //     const userId=JSON.parse(localStorage.getItem("user"))
    //     console.log(userId._id)
    //   //For All Data
    //     let result = response.data;
    //     console.log(result)

    //     if(result){
    //         localStorage.setItem("user", JSON.stringify(result))
    //         navigate("/")
    //     }
    //     else{
    //         alert("There is an error!")
    //     }
    // }

     const addCategory = async () => {
           if(!name || !price || !category || !company){
               setError(true)
               return false
           }
       console.log(name, price, category, company);
       const userId = JSON.parse(localStorage.getItem("user"))._id;
       try {
         const response = await axios.post(
           "http://localhost:5005/add-product",
           {
             name,
             price,
             category,
             company,
             userId,
           }
         );
         console.log(response.data);
       } catch (error) {
         console.error("Error adding product:", error);
       }
     }

  return (
    <div className="flex gap-x-4 p-5 items-center">
      <h1 className="font-bold">Add Product</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Name"
      />
      {error && !name && <p className="text-red-500">Please Enter Name</p>}
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Price"
      />
      {error && !price && <p className="text-red-500">Please Enter Price</p>}

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Category"
      />
      {error && !category && <p className="text-red-500">Please Enter Category</p>}

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Company"
      />
          {error && !company && <p className="text-red-500">Please Enter Company</p>}

      <button
        onClick={addCategory}
        className="bg-blue-400 text-white p-1 rounded-lg hover:bg-blue-300"
      >
        Add Product
      </button>
    </div>
  );
}

export default AddProduct