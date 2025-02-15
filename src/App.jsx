import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/Home/Home.jsx"
import Layout from "./components/Layout/Layout.jsx"
import Login from "./components/Login/Login.jsx"
import Register from "./components/Register/Register.jsx"
import Navbar from "./components/Navbar/Navbar.jsx"
import Cart from "./components/Cart/Cart.jsx"
import Categories from "./components/Categories/Categories.jsx"
import Brands from "./components/Brands/Brands.jsx"
import ProductsDetails from "./components/productsDetails/productsDetails.jsx"
import Products from "./components/Products/Products.jsx"
import ForgotPassword from  "./components/ForgotPassword/ForgotPassword.jsx"
import WishList from "./components/WishList/Wish.jsx"
import ProtectRoute from './components/ProtectRoute/ProtectRoute.jsx'
import Checkout from "./components/Checkout/Checkout.jsx"
import ResetAccount from "./components/ResetAccount/ResetAccount.jsx"
import ResetCodeVerfion from "./components/ResetCodeVerfion/ResetCodeVerfion.jsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders.jsx'
import WhishContextProvider from './Context/WishList.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import UserCartProvider from "./Context/UserCart.jsx"



function App() {

  const routers =createBrowserRouter([{
    path:"" ,element:<Layout/>,children:[
      {path:"home",element:<ProtectRoute> <Home/></ProtectRoute>},
      {index:true,element:<ProtectRoute> <Home/></ProtectRoute>},
      {path:"login",element:<Login/>},
      {index:true,element:<Register/>},
      {path:"register",element:<Register/>},
      {path:"navbar",element:<Navbar/>},
      {path:"forgotpassword",element:<ForgotPassword/>},
      {path:"resetcodeverfion",element:<ResetCodeVerfion/>},
      {path:"resetaccount",element:<ResetAccount/>},
      {path:"cart",element:<ProtectRoute> <Cart/></ProtectRoute>},
      {path:"wishlist",element:<ProtectRoute> <WishList/> </ProtectRoute>},
      {path:"categories",element:<ProtectRoute> <Categories/></ProtectRoute>},
      {path:"products",element:<ProtectRoute> <Products/></ProtectRoute>},
      {path:"brands",element:<ProtectRoute> <Brands/></ProtectRoute>},
      {path:"checkout",element:<ProtectRoute> <Checkout/></ProtectRoute>},
      {path:"productsDetails/:id",element:<ProtectRoute> <ProductsDetails/></ProtectRoute>},
      {path:"allorders",element:<ProtectRoute> <AllOrders/></ProtectRoute>},
    ]
  }
  ]
  )


  const query = new QueryClient()


 
  return <>

<UserCartProvider>
<QueryClientProvider client={query}>
  <UserContextProvider>
<WhishContextProvider>
  <RouterProvider router={routers}></RouterProvider>
  <Toaster/>
</WhishContextProvider>
  </UserContextProvider>
  </QueryClientProvider>
</UserCartProvider>
  
  
  
  </>
     
  
}

export default App