import axios from 'axios'
import { useFormik, useFormikContext, validateYupSchema } from 'formik'

import React, { useEffect, useState,navigate, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext.jsx'
import { NavLink,Link } from 'react-router-dom'


export default function Login() {
  


  const [loading, setloading] = useState(false)
  const [sucess, setsucess] = useState(null)
  const [fail, setfail] = useState(null)
  let navigate = useNavigate()
   let {userToken,setUserToken}= useContext(UserContext)


  async function login (values){
    setsucess(null)
    setfail(null)
    try{
      setloading(true)
      let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
      console.log(data)
      setsucess(data.message)
      localStorage.setItem("Token",data.token)
      setUserToken(data.token)
      setloading(false)
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }catch(err){
      setloading(false)
      console.log(err)
      setfail(err.response.data.message)
    }
   


  }


  let validationSchema = Yup.object().shape({
    email:Yup.string().required().min(3,"enter more than 3 letters").email("email not vaild"),
    password:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,"ex(pass123)"),
  })




  

  const formik =useFormik({

    initialValues:{
    email:"",
    password:"",
    
    },validationSchema:validationSchema
    ,onSubmit:login


  })

  
  return <>

<form className="container p-[20px] mx-auto mt-[25px] w-full" onSubmit={formik.handleSubmit}>
<h1 className='py-10 text-[25px]'>Login  now</h1>
<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="email" className='my-10 p-3'>E-mail:</label>
    <input type="email" name='email' id='email' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.email&&formik.touched.email &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.email}
</div>}


<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="password" className='my-10'>Password:</label>
    <input type="password" name='password' id='password' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.password&&formik.touched.password &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.password}
</div>}

  
<div className='flex justify-end w-full'>
<div className='px-7 text-main flex justify-center items-center'>
<p className=' capitalize'>{sucess}</p>
<p className=' capitalize'>{fail}</p>
</div>
{loading?<button type="button" className="  text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-[150px] sm:w-auto px-5 py-3 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">loading...</button>:
  <button type="submit" className=" text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-[150px] sm:w-auto px-5 py-3 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>
  }
</div>


  <Link to={"/forgotpassword"}>
<span className='text-xl hover:text-main cursor-pointer'>Forgot Your Password ?</span>
  </Link>
</form>




  </>
   
  
}
