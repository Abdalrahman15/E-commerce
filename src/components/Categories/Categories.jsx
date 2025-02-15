import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Categories() {

  const [Category, setCategory] = useState(null)
  const [SubCategory, setSubCategory] = useState(null)
  const [SubCategoryName, setSubCategoryName] = useState([])


  async function getCategories(){

    try{
      let data = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategory(data?.data?.data)
    
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getCategories()
  
    return () => {
      
    }
  }, [])




  async function subCategory(id){
    try{
      let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
   setSubCategory(data?.data?.data)
    }catch(err){
      console.log(err)
    }

  }
  async function subCategoryName(id){
    try{
      let data=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      setSubCategoryName(data?.data?.data?.name)
    }catch(err){
      console.log(err)
    }

  }

  function go(id){
    
    subCategory(id)
    subCategoryName(id)
  }


  console.log(SubCategoryName)




  
  return <>

<div className='mt-[50px] flex flex-wrap gap-5  '>
  {
    Category?.map((cat)=>{return <>
   <div onClick={()=>{go(cat._id)}} className="max-w-sm bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 lg:w-1/3 sm:w-3/3 md:w-3/3 mx-auto rounded lg:h-[350px] overflow-hidden cursor-pointer">
  <img className="w-full lg:h-[250px] object-cover" src={cat.image} alt="" />
  <div className="p-5">
    <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 mt-4">
      {cat.name}
    </h5>
  </div>
</div>
     
    </>
    })


  }
</div>

<h1 className='mt-[150px] text-center text-3xl font-bold text-main hover:drop-shadow-[0_0_10px_#09c] transition duration-100'>

{SubCategoryName}

</h1>

<div className='mt-[70px] flex flex-wrap flex-row gap-5 justify-start mx-auto container'>



  



{
    SubCategory?.map((subcat)=>{return<>
    <div  className="max-w-sm bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 lg:w-1/3 sm:w-3/3 md:w-3/3  rounded lg:h-[100px] overflow-hidden cursor-pointer mx-auto">
  <div className="p-5">
    <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 mt-4">
      {subcat.name}
    </h5>
  </div>
</div>
    
    </>})
  }










  

  



</div>








  
  </>
   
  
}
