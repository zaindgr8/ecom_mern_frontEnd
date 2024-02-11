import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts]=useState([])
    useEffect(()=>{
        getProducts()
    },[])

   const getProducts = async (id) => {
       const response = await axios.get("http://localhost:5005/products",{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       setProducts(response.data)
   }

    const deleteProduct = async (id) => {
      const response = await axios.delete(
        `http://localhost:5005/product/${id}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      getProducts();
    }

    const searchHandle=async (e)=>{
      let key= e.target.value
      if(key){
        const response = await axios.get(`http://localhost:5005/search/${key}`,
          {
            headers: {authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,},
          }
        )
        let result =await response.data
        setProducts(result)
      }
      else{
        getProducts()
      }
     
    }
   
    // const searchHandle = async (event) => {
    //   let key = event.target.value;
    //   let result = await fetch(`http://localhost:5005/search/${key}`);
    //   result = await result.json();
    //   if (result) {
    //     setProducts(result);
    //   }
    // }


  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="font-bold">Product List</h1>
      <input onChange={searchHandle} placeholder='Search Product' className='border-2 p-2 rounded-lg mt-2 mb-2'></input>
      <ul className="flex">
        <li className="border-2 p-2">S. No</li>
        <li className="border-2 p-2">Name</li>
        <li className="border-2 p-2">Price</li>
        <li className="border-2 p-2">Category</li>
        <li className="border-2 p-2">Operation</li>
      </ul>
      {products.length>0 ? products.map((item, index) => 
        <ul key={item._id} className="flex">
          <li className="border-2 p-2">{index + 1}</li>
          <li className="border-2 p-2">{item.name}</li>
          <li className="border-2 p-2">{item.price}</li>
          <li className="border-2 p-2">{item.category}</li>
          <li className="border-2 p-2 bg-red-200"><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
          <li className='bg-yellow-200 border-2'><Link to={"/update/"+item._id}>Update</Link></li>
        </ul>
      ):<h1>No Result Found</h1>}
    </div>
  );
}

export default ProductList