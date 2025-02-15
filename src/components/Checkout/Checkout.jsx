import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik, useFormikContext, validateYupSchema } from 'formik'

import { UserContext } from '../../Context/Usercontext'
import { CartContext } from '../../Context/UserCart'
import toast from 'react-hot-toast'






export default function Checkout() {

  const [loading, setloading] = useState(false)
  const [sucess, setsucess] = useState(null)
  const [fail, setfail] = useState(null)
   let {userToken,setUserToken}= useContext(UserContext)
   let {Cart}= useContext(CartContext)
   const [Port, setPort] = useState(0)

   


  async function checkout (shippingAddress){
    setsucess(null)
    setfail(null)
    try{
      setloading(true)
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Cart.data.cartId}?url=http://localhost:${Port}`,shippingAddress,{
        headers:{
          token:localStorage.getItem("Token")
      }
      })

      console.log(data)
      toast.success(data.status)
      location.href=data.session.url
      
      setloading(false)
   
    }catch(err){
      setloading(false)
      console.log(err)
      setfail(err.response.data.message)
    }
   


  }


  useEffect(() => {

   console.log(window.location.port);
   setPort(window.location.port)
  
    return () => {
      
    }
  }, [])
  


 




  

  const formik =useFormik({

    initialValues:{
      details:"",
      phone:"",
      
    
    }
    ,onSubmit:checkout


  })

  return <>




<form className="container p-[20px] mx-auto mt-[25px] w-full" onSubmit={formik.handleSubmit}>
<h1 className='py-10 text-[25px]'>Login  now</h1>
<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="details" className='my-10 p-3'>Details:</label>
    <input type="text" name='details' id='details' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="city" className='my-10 p-3'>city:</label>
    <input type="text" name='city' id='city' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="phone" className='my-10 p-3'>Phone:</label>
    <input type="number" name='phone' id='phone' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
 
  
<div className='flex justify-end w-full'>
<div className='px-7 text-main flex justify-center items-center'>
<p className=' capitalize'>{sucess}</p>
<p className=' capitalize'>{fail}</p>
</div>
{loading?<button type="button" className="  text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-[150px] sm:w-auto px-5 py-3 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">loading...</button>:
  <button type="submit" className=" text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-[150px] sm:w-auto px-5 py-3 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>
  }
</div>
  
</form>
  </>
    
  
}

