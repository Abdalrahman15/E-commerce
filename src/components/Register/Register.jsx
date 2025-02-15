import axios from 'axios'
import { useFormik, useFormikContext, validateYupSchema } from 'formik'
import native from 'i/lib/native'
import React, { useEffect, useState,navigate } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext.jsx'


export default function Register() {


  const [loading, setloading] = useState(false)
  const [sucess, setsucess] = useState(null)
  const [fail, setfail] = useState(null)
  let navigate = useNavigate()
  let {userToken,setUserToken}= useContext(UserContext)
  

 
 

  async function register (values){
    setsucess(null)
    setfail(null)

    try{

      setloading(true)
      let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
      console.log(data.message)
      console.log(data)
      setsucess(data.message)
      setloading(false)
      localStorage.setItem("Token",data.token)
      setUserToken(data.token)
      setTimeout(() => {
        navigate("/home");
      }, 1000);

    }catch(err){

      setloading(false)
      console.log(err.response.data.message)
      setfail(err.response.data.message)

    }
   
  }


  let validationSchema = Yup.object().shape({
    name:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters"),
    email:Yup.string().required().min(3,"enter more than 3 letters").email("email not vaild"),
    password:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,"ex(pass123)"),
    rePassword:Yup.string().required().oneOf([Yup.ref("password")],"repassword not matched"),
    phone:Yup.string().required().matches(/^01[0-2,5]{1}[0-9]{8}$/,"egyption numbers onley")
  })




  

  const formik =useFormik({

    initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""


      
    },validationSchema:validationSchema
    ,onSubmit:register


  })

  
  return <>

<form className="container p-[20px] mx-auto mt-[25px] w-full" onSubmit={formik.handleSubmit}>
  <h1 className='py-10 text-[25px]'>Register now</h1>
  <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="name" className='my-10'>Name:</label>
    <input type="text" name='name' id='name' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.name&&formik.touched.name &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.name}
</div>}


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

<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="rePassword" className='my-10'>RePassword:</label>
    <input type="password" name='rePassword' id='rePassword' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.rePassword &&formik.touched.rePassword &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.rePassword}
</div>}

<div className="relative z-0 w-full mb-5 group">
    <label htmlFor="phone" className='my-10'>Phone:</label>
    <input type="tel" name='phone' id='phone' className=' border border-gray-300 block rounded w-full h-[35px]' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.phone&&formik.touched.phone &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.phone}
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
  
  
</form>


  </>
   
  
}
