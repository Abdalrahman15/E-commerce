import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'

 export let  CartContext = createContext()






export default function CartContextProvider({children}) {

    const [Cart, setCart] = useState(null)

    async function addToCart(productId ) {
        try{
            let data =await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},
                {
                    headers:{
                        token:localStorage.getItem("Token")
                    }
                }
    
            )
           
            getFromCart()
            
            toast.success("Added Successfully")
            setCart(data)
        }
        catch(err){
            console.log(err)
        }
        
    }

    async function UpdateProduct(id,count) {
        try{
            let data =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
                headers:{
                    token:localStorage.getItem("Token")
                }

            }
            )
           
            setCart(data)
            toast.success("Success")
            
            
        }
        catch(err){
            console.log(err)
        }

    }


    useEffect(() => {
     
        getFromCart()
      return () => {
      }
    }, [])

    async function getFromCart() {
        try{
            let data =await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    headers:{
                        token:localStorage.getItem("Token")
                    }
                }
    
            )
            
            setCart(data)
            
        }
        catch(err){
            console.log(err)
        }
        
    }




    async function DeleteProduct(id) {
        try{
            let data =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers:{
                    token:localStorage.getItem("Token")
                }

            }
            )
            
            setCart(data)
            toast.success("Success")
            
        }
        catch(err){
            console.log(err)
        }
         

    }
    async function ClearCart() {
        try{
            let data =await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{
                    token:localStorage.getItem("Token")
                }

            }
            )
       
            setCart(data)
            toast.success("Success")
            
        }
        catch(err){
            console.log(err)
        }
         
    }
    













  return <CartContext.Provider value={{Cart,setCart,addToCart,getFromCart,UpdateProduct,DeleteProduct,ClearCart}}>

    {children}


  </CartContext.Provider>
   
}
