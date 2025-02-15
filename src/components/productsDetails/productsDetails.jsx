import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/UserCart.jsx'
import { WishContext } from '../../Context/WishList.jsx';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function productsDetails() {

   let {id} = useParams()
   const [data, setData] = useState(null)
   let {Cart,setCart,addToCart}=useContext(CartContext)
   let { Whish, WishList, WishListRemove } = useContext(WishContext);
   const [HeartColor, setHeartColor] = useState("fa-solid fa-heart text-3xl")
   const [Heart, setHeart] = useState(false);
   const [Subs, setSubs] = useState(null)
   const [CatData, setCatData] = useState(null)
 

   useEffect(() => {
    if (id) {
      const storedHearts = JSON.parse(localStorage.getItem("Heart")) || [];
      if (storedHearts.includes(id)) {
        setHeart(true);
        setHeartColor("text-red-500");
      }
    }
  }, [id]);
  
 
  const toggleHeart = () => {
    let storedArray = JSON.parse(localStorage.getItem("Heart"))||[] ; 
  
    if (!Heart) {
      WishList(id);
      setHeartColor("text-red-500");
  
      if (!storedArray.includes(id)) { 
        storedArray.push(id);
        localStorage.setItem("Heart", JSON.stringify(storedArray));
      }
    } else {
      WishListRemove(id);
      setHeartColor("fa-solid fa-heart text-3xl");
  
      storedArray = storedArray.filter(id => id !== id); 
      localStorage.setItem("Heart", JSON.stringify(storedArray));
    }
    
    setHeart(!Heart);
  };




   

    async function getTargetedProduct(id){
      let data = await  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

      
      setData(data?.data?.data)

    }

  


    useEffect(() => {
        getTargetedProduct(id)
      
    
      return () => {
        
      }
    }, [id])



    async function RelatedProduct() {

      try{

       let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${data?.category?._id}/subcategories`)
    
         
         setSubs(res)
       
      
      

      }catch(err){
        console.log(err)
      }

    }







    useEffect(() => {
      if(data?.category?._id){
        RelatedProduct() 
      }

      
      return () => {
        
      }
    }, [data,Subs])


   
    


   
 
   
     



    


    



  return <>
  <div className=' container mt-7 grid grid-rows-[auto_1fr_auto] min-h-screen'>

  <div className='grid grid-cols-8 gap-5  '>

  <div className="col-span-3 flex ">
  <Swiper pagination={true} modules={[Pagination]} className="mySwiper" loop={true}>
    {
      data?.images?.map((data,index)=>{return<>
      <SwiperSlide><img key={index} src={data} alt="" /></SwiperSlide>
      </>})
    }
        
        
        
        
        
      </Swiper>
</div>

  <div className="col-span-5 flex flex-col justify-center  ">

  <h1 className=" text-lg p-1">{data?.title}</h1>
  <h2 className='text-sm p-1'>{data?.description}</h2>
  <h2 className='text-md p-1'>{data?.price}$</h2>

  <div className='flex justify-center mt-3 gap-5'>
  <button onClick={()=>{addToCart(id)}} className="w-4/5 font-bold text-3xl  text-white bg-main hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    + Add to cart
  </button>

  <div className=' w-1/5 text-center flex flex-col justify-center items-center gap-3 '>
  <div className='flex'>
  <i class="fa-solid fa-star p-1 text-yellow-300"></i>
  {data?.ratingsAverage}
  </div>
  <span onClick={()=>toggleHeart(id)}>
  <i className={`fa-solid fa-heart text-3xl cursor-pointer ${HeartColor}`}></i>

  </span>
  
  </div>
  


  </div>



  </div>

  
 
</div>
  </div>
  <h1 className='text-center mt-7 text-main text-3xl hover:drop-shadow-[0_0_10px_#09c]  font-bold cursor-pointer'>Related Categories</h1>
  <div className='mt-[50px] flex flex-wrap flex-row gap-5 justify-start mx-auto container p-5'>
    
  {
    Subs?.data?.data?.map((sub)=>{return<>
    <div  className="max-w-sm bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 lg:w-1/3 sm:w-3/3 md:w-3/3  rounded lg:h-[100px] overflow-hidden cursor-pointer mx-auto">
  <div className="p-5">
    <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 mt-4 p-5 flex justify-center items-center">
      {sub.name}
    </h5>
  </div>
</div>
    
    </>})
  }



  </div>










  </>   
}
