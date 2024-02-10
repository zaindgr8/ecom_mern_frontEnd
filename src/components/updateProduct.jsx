import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params= useParams()
  const navigate= useNavigate()

  useEffect(()=>{
    getProductDetail()
  },[])

const getProductDetail = async () => {
  console.log(params);
    const response = await axios.get(
      `http://localhost:5005/product/${params.id}`
    );
    const result = response.data;
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company)
  }

 
  const updateProduct = async () => {
  console.log(name, price, category, company);

    const response = await axios.put(`http://localhost:5005/product/${params.id}`, {
      name,
      price,
      category,
      company
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    let result= response.data
    if(result){
      console.log("update Working")
      navigate("/")
    }else{
      console.log("Error!")
    }
  }

  return (
    <div className="flex gap-x-4 p-5 items-center">
      <h1 className="font-bold">Update Product</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Name"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Price"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Category"
      />

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        type="text"
        className="border-2 p-1 rounded-lg"
        placeholder="Enter Company"
      />

      <button
        onClick={updateProduct}
        className="bg-blue-400 text-white p-1 rounded-lg hover:bg-blue-300"
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct
