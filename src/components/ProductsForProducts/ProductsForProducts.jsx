import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { useQuery } from '@tanstack/react-query'
import Products from '../Products/Products'
import Wish from "../WishList/Wish.jsx"

export default function ProductsForProducts() {

    // const [Product, setProduct] = useState([])



    // async function getAllProducts() {

    //     const data = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        
    //     setProduct(data.data.data)
        
    // }

    // useEffect(() => {
    //   getAllProducts()
      
    
    //   return () => {
        
    //   }
    // }, [])




    async function getAllProducts(){


return await axios.get("https://ecommerce.routemisr.com/api/v1/products")

    }

    let {data,isLoading, isFetching}= useQuery({
      queryKey:["products"],
      queryFn:getAllProducts
    })


    const TheData=data?.data.data






    



  return <>

  
 
{  TheData.map((prod)=><Products go={prod}/>) }





  </>
}
