
import axios from 'axios'
import { useFormik, useFormikContext, validateYupSchema } from 'formik'
import native from 'i/lib/native'
import React, { useEffect, useState,navigate } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/Usercontext'
import { NavLink,Link } from 'react-router-dom'

export default function ResetAccount() {
    



    const [loading, setloading] = useState(false)
  const [sucess, setsucess] = useState(null)
  const [fail, setfail] = useState(null)
  let navigate = useNavigate()
   


  async function ResetAcc (values){
    setsucess(null)
    setfail(null)
    try{
      setloading(true)
      let {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
      console.log(data)
      setsucess(data.message)
      
     
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
     newPassword:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,"ex(pass123)"),
  });







  

  const formik =useFormik({

    initialValues:{
        email:"",
        newPassword:"",
    
    
    }
    ,validationSchema
    ,onSubmit:ResetAcc


  })











  return <>

  <form className='mt-[50px]' onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="email" className='my-10 pb-11 '>New E-mail :</label>
    <input type="email" name='email' id='email' className=' border border-gray-300 block rounded w-full h-[35px] p-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.email&&formik.touched.email &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium mr-9">    </span> {formik.errors.email}
</div>}

    <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="newPassword" className='my-10 pb-11 '>New Password :</label>
    <input type="Password" name='newPassword' id='newPassword' className=' border border-gray-300 block rounded w-full h-[35px] p-3' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.newPassword&&formik.touched.newPassword &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium mr-9">    </span> {formik.errors.newPassword}
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

    
  </form >
  
  
  </>
}
