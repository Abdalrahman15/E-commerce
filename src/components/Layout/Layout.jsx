import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'


export default function Layout() {



  
  return <>

  <div className=''>
  <Navbar/>

  </div>

<div className=' container flex-grow mt-6 py-12 relative  '>

<Outlet></Outlet>
</div>
 
<div className=' '>
  <Footer/>

</div>


  
  </>
   
  
}