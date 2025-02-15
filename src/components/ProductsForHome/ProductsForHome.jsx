import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { useQuery } from '@tanstack/react-query'
import Products from '../Products/Products'
import Wish from "../WishList/Wish.jsx"

export default function ProductsForHome() {

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

  {/* {Product.map((prod)=><Card go={prod}/>)} */}
 
{ isLoading? <div className=' z-10 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-zinc-400'><div className='loader'></div></div>:TheData.map((prod)=><Card go={prod}/>) }





  </>
}
