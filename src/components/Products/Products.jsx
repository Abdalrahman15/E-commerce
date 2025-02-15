import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../Context/UserCart.jsx'
import { WishContext } from '../../Context/WishList.jsx';


export default function Products() {


  


  let {Cart,setCart,addToCart}=useContext(CartContext)
   let { Whish, WishList, WishListRemove } = useContext(WishContext);
    const [HeartColor, setHeartColor] = useState("fa-solid fa-heart text-3xl")
    const [Heart, setHeart] = useState(false);
  const [Products, setProducts] = useState([])
  const [Type, setType] = useState(" ")



 



  
   
  



  

  useEffect((_id) => {
    if (_id) {
      const storedHearts = JSON.parse(localStorage.getItem("Heart")) || [];
      if (storedHearts.includes(_id)) {
        setHeart(true);
        setHeartColor("text-red-500");
      }
    }
  }, []);
  
  const toggleHeart = (productId) => {
    let storedArray = JSON.parse(localStorage.getItem("Heart")) || [];

    if (!storedArray.includes(productId)) {
        WishList(productId);
        storedArray.push(productId);
    } else {
        WishListRemove(productId);
        storedArray = storedArray.filter(id => id !== productId);
    }

    localStorage.setItem("Heart", JSON.stringify(storedArray));
    setHeart(!Heart);   
};
  

  async function getProducts() {
   try{
    let data = await  axios.get("https://ecommerce.routemisr.com/api/v1/products")
   console.log(data)
   setProducts(data?.data?.data)

   }catch(err){
    console.log(err)
   }
  }

  useEffect(() => {
    getProducts()
  
  
    return () => {
      
    }
  }, [])
  
  
  return <>
<div className='mt-[50px] '>
<div className="relative z-0 w-full mb-5 group ">
    
    <input type="email" name='email' id='email' className=' border border-gray-300 block rounded w-[80%] mx-auto h-[40px]' placeholder=' Search...'  onChange={(e)=> {return setType(e.target.value)} }  />
  </div>

</div>




<div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[50px]'>
{
 Products.filter((product)=>product.title.toLowerCase().includes(Type)).map((product)=> {return <>
 <div key={product?._id || index} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <Link to={`/productsDetails/${product?._id}`}>
        <h1 className="text-center">{product?.title}</h1>
        <div className='flex justify-center my-3'>
          <img className="w-52" src={product?.imageCover} alt="product image" />
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product?.description.slice(0, 70) + "..."}
          </h5><br></br>
          <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
          <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product?.ratingsAverage}
          </span>
        </div>
          
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{product?.price + "$"}</span>
        </div><br></br>
      </Link>
      <div className="mt-3 relative">
    <span className=' absolute right-[11px] -top-[60px] cursor-pointer' onClick={()=>toggleHeart(product._id)} ></span>
      <button onClick={() => addToCart(product._id)}
        className="w-full text-white bg-main hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Add to cart
      </button>
    </div>
</div>


 
 
 
 </>})
}
  




</div>


 

  
  </>
   
  
}
