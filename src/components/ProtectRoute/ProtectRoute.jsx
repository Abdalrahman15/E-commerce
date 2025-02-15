import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

export default function ({children}) {

if(localStorage.getItem("Token")){

    return children

}else{
    return <Navigate to={"/login"}/>
}

  return <>
  
  </>
   
  
}
