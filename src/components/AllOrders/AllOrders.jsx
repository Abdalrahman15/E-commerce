import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const [Orders, setOrders] = useState([])
  
 const token = localStorage.getItem("Token")
 const decoded = jwtDecode(token);








 

 



  

  







  async function  getUserOrders() {
    try{
      let data =  await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
   console.log(data.data,)
   setOrders(data.data)
    }catch(err){
      console.log(err)
    }
  }


  useEffect(() => {
    getUserOrders()
  
    return () => {
    }
  }, [])


 





  


  






  return <>

  <div className='mt-[100px] '>
  <div className='p-5 bg-main text-center text-3xl text-white rounded'>
    <span>Total Prices : </span>
  <span>
          {
            Orders.reduce((total, order) => {
              return total + (order?.totalOrderPrice || 0);
            }, 0) 
          }
         </span>
        <span> $</span>
    </div>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Payment Time
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Taxes
        </th>
      </tr>
    </thead>
    <tbody>
    {Orders.map((order,index)=>{return order?.cartItems.map((item,index)=>{return<>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover}className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        
        {Orders.map((order,index)=>{return <>
        <td className="px-6 py-4 flex flex-col">
          {order?.paidAt}

            </td>
            </>
          })}
        
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.price} <span>$</span>
        </td>
        {Orders.map((order,index)=>{return <>
        <td className="px-6 py-4 flex flex-col">
          {order?.taxPrice}$

            </td>
            </>
          
          })}
      </tr></>
    
    

       }) 
        } )}
      
      
    </tbody>
  </table>
</div>


    
  

  </div>
   

  </>
  
}
