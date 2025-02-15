import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'





export let WishContext = createContext()
export default function WishContextProvider ({children}) {

     const [Whish, setWhish] = useState(null)


    async function WishList(productId){

        try{
            let data = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},{
                headers:{
                      token:localStorage.getItem("Token")
                  } 
          })
  
          console.log(data)
          toast.success("Added Successfully")
          setWhish(data)


        }catch(err){
            console.log(err)
        }



    }

    async function WishListRemove(productId){

        try{
            let data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
                headers:{
                      token:localStorage.getItem("Token")
                  } 
          })
  
          console.log(data)
          toast.success("Removed Successfully")
          setWhish(data)


        }catch(err){
            console.log(err)
        }



    }


  




  return <WishContext.Provider value={{Whish,setWhish,WishList,WishListRemove}}>
    {children}
  </WishContext.Provider>
  
  
}
