
import axios from 'axios'
import { useFormik, useFormikContext, validateYupSchema } from 'formik'
import native from 'i/lib/native'
import React, { useEffect, useState,navigate } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/Usercontext'
import { NavLink,Link } from 'react-router-dom'

export default function ResetCodeVerfion() {

    




    const [loading, setloading] = useState(false)
  const [sucess, setsucess] = useState(null)
  const [fail, setfail] = useState(null)
  let navigate = useNavigate()
   


  async function Reset (values){
    setsucess(null)
    setfail(null)
    try{
      setloading(true)
      let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
      console.log(data)
      setsucess(data.message)
      
     
      setloading(false)
      setTimeout(() => {
        navigate("/resetaccount");
      }, 1000);
    }catch(err){
      setloading(false)
      console.log(err)
      setfail(err.response.data.message)
    }
   


  }


  let validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .matches(/^\d+$/, " Onley Number Allow  ") 
      .required(" Required  "), 
  });







  

  const formik =useFormik({

    initialValues:{
     resetCode:"",
    
    
    }
    ,validationSchema
    ,onSubmit:Reset


  })


    









  return<>

  <form className='mt-[50px]' onSubmit={formik.handleSubmit}>
    <div className="relative z-0 w-full mb-5 group">
    <label htmlFor="resetCode" className='my-10 pb-11 '>Enter Reset Code :</label>
    <input type="tel" name='resetCode' id='resetCode' className=' border border-gray-300 block rounded w-full h-[35px] p-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
  </div>
  {formik.errors.resetCode&&formik.touched.resetCode &&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium mr-9">    </span> {formik.errors.resetCode}
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
