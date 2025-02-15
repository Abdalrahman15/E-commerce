import React, { useContext, useEffect, useState } from 'react'
import Logo from "../../assets/images/freshcart-logo.svg"
import { NavLink, useNavigate,Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.jsx'
import { CartContext } from '../../Context/UserCart.jsx'



export default function Navbar() {
const [toggle, settoggle] = useState(false)
const [scroll, setScroll] = useState("bg-[#f9fafb]")
let {userToken,setUserToken}= useContext(UserContext)
let navigate = useNavigate()
const [test, setTest] = useState(false)
  let{Cart,UpdateProduct,DeleteProduct}=useContext(CartContext)


function LogOut (){

  localStorage.removeItem("Token")
  setUserToken(null)
  navigate("/login")


}

useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    
    if (scrollY > 20) {
      setScroll(" bg-green-300");
    } else {
      setScroll(" bg-[#f9fafb]");
    }
  };

  
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return <>





<nav className={` fixed top-0 right-0 left-0 z-50 `}>
  <div className={`flex items-center p-7 z-50  ${scroll}`}> 
  <div className="w-1/3 ">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
     <Link to={"/home"}><img src={Logo}className="h-8 hover:bg-green-100 rounded" alt="Flowbite Logo" /></Link> 
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
    </a> 
    </div>

    <button onClick={()=>{setTest(!test)}} data-collapse-toggle="navbar-solid-bg" type="button" className="flex md:block sm:block lg:hidden    ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>


    <div className="lg:block hidden  md:hidden   w-1/3" id="navbar-solid-bg">
      <ul className="flex justify-center flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        {userToken&&<><NavLink to="home" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">Home</NavLink>
        <NavLink to="wishlist" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">WishList</NavLink>
        <NavLink to="cart" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">Cart</NavLink>
        <NavLink to="categories" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">Categories</NavLink>
        <NavLink to="brands" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">Brands</NavLink>
        <NavLink to="products" className=" block rounded-lg  text-base/7  text-gray-500 aria-[current=page]:text-main ">Products</NavLink></>}
      </ul>
    </div>

    <div className="lg:block hidden  md:hidden  w-1/3 " id="navbar-solid-bg ">
      <ul className=" flex justify-end flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
      {userToken?<>
      <div className='flex gap-5 justify-center items-center p-0 m-0'>
        <div className='p-0 m-0 flex flex-col relative'>
        <div className='p-0 m-0 self-end bg-main px-2 rounded absolute -top-[11px] -right-[10px] text-white font-bold'>{Cart?.data.numOfCartItems}</div>
        <Link to={"/cart"}>
        <i className="fa-solid fa-cart-shopping text-4xl p-0 m-0 hover:text-[green]"></i>
        </Link>
        </div>
      
      <span onClick={()=>LogOut()} aria-hidden="true" className="text-sm/6 font-semibold text-gray-900 aria-[current=page]:text-main hover:text-main cursor-pointer">Log out</span></div></>:<>
          <NavLink to="login" className="text-sm/6 font-semibold text-gray-900 aria-[current=page]:text-main px-3 hover:text-main">Log in <span aria-hidden="true"></span></NavLink>
          <NavLink to="register" className="text-sm/6 font-semibold text-gray-900 aria-[current=page]:text-main px-3 hover:text-main">Register <span aria-hidden="true"></span></NavLink>
        </>}
       
       
      </ul>
    </div>
    </div>

    {test&&<div className=" relative top-[1px] left-[1px] right-[0]  h-[300px] bg-[#f9fafb] z-40 lg:hidden">
  
  {userToken&&<>
  <ul>
  <NavLink to="home" className="-mx-3 block rounded-lg px-6 py-2text-base/7  text-gray-500 aria-[current=page]:text-main ">Home</NavLink>
  <NavLink to="cart" className="-mx-3 block rounded-lg px-6 py-2 text-base/7  text-gray-500 aria-[current=page]:text-main ">Cart</NavLink>
  <NavLink to="categories" className="-mx-3 block rounded-lg px-6 py-2 text-base/7  text-gray-500 aria-[current=page]:text-main ">Categories</NavLink>
  <NavLink to="brands" className="-mx-3 block rounded-lg px-6 py-2 text-base/7  text-gray-500 aria-[current=page]:text-main ">Brands</NavLink>
  <NavLink to="products" className="-mx-3 block rounded-lg px-6 py-2 text-base/7  text-gray-500 aria-[current=page]:text-main ">Products</NavLink>
  </ul>
  </>}
  <div className="  flex justify-center " id="navbar-solid-bg ">
      <ul className=" flex justify-center items-center flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
      {userToken?<>
        <span onClick={()=>LogOut()}  aria-hidden="true" className="text-sm/6 font-semibold text-gray-500 aria-[current=page]:text-main hover:text-main cursor-pointer">Log out</span>
        <div className='p-0 m-0 flex flex-col relative mt-5'>
        <div className='p-0 m-0 self-end bg-main px-2 rounded absolute -top-[11px] -right-[10px] text-white font-bold'>{Cart?.data.numOfCartItems}</div>
        <i className="fa-solid fa-cart-shopping text-4xl p-0 m-0"></i>
        </div></> 
        :<>
              <NavLink to="login" className="text-sm/6 font-semibold text-gray-500 aria-[current=page]:text-main py-1 hover:text-main">Log in <span aria-hidden="true"></span></NavLink>
              <NavLink to="register" className="text-sm/6 font-semibold text-gray-500 aria-[current=page]:text-main py-1 hover:text-main">Register <span aria-hidden="true"></span></NavLink>
            </>}
      </ul>
    </div>
  
  
  
  
  </div>}

  
</nav>



 


  </>
   
  
}
