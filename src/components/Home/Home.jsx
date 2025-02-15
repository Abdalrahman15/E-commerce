import React, { useEffect, useState } from 'react'
import ProductsForHome from '../ProductsForHome/ProductsForHome'
import Slider1 from "../../assets/images/slider-image-3.jpeg"
import Slider2 from "../../assets/images/slider-image-2.jpeg"
import Slider3 from "../../assets/images/slider-image-1.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import toast from 'react-hot-toast'
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



export default function Home() {
  const token = localStorage.getItem("Token")
  const decoded = jwtDecode(token);

useEffect(() => {

  const wellcome = sessionStorage.getItem("Seen")


  if(!wellcome){
    toast("Welcome Back "+  decoded.name,{
      duration:4000
  
    })
    sessionStorage.setItem("Seen","true")
  }




 

  return () => {
    
  }
}, [])





  
  


  async function getAllCategories(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
        }


        let{data , isLoading}=useQuery({
          queryKey:["categories"],
          queryFn:getAllCategories
        })

        const categories = data?.data.data
     
       console.log(categories)
        

        



  
  return <>




<div className=' grid grid-cols-6 container p-7'>
  <div className='col-span-4 bg-red-500 h-full'>
    <Swiper loop={true} style={{height:"100%"}} modules={[Pagination] }  > 
      <SwiperSlide>
        <img src={Slider1} className=' w-full h-full block ' alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={Slider2} className=' w-full h-full block' alt="" />
      </SwiperSlide>
    </Swiper>
    </div>
  <div className='col-span-2 bg-teal-200'>
    <img src={Slider3} className="h-1/2" alt="" />
    <img src={Slider3} className="h-1/2" alt="" />
  </div>
</div>









<div>
  <Swiper loop={true} slidesPerView={6}>
  

{categories?.map((cat)=>{return <SwiperSlide><img src={cat.image} className=' w-full h-[200px]' alt="" /></SwiperSlide> })}

   
  </Swiper>


</div> 

















<div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[30px]">
<ProductsForHome/> 
</div>

  </>
   
  
}
