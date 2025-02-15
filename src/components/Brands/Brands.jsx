import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function Brands() {
  const [Brands, setBrands] = useState([])
  const [Drop, setDrop] = useState("hidden")
  const [ThisBrand, setThisBrand] = useState(null)


async function GetBrands() {
  try{
    let res = await  axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setBrands(res?.data?.data)
    

 console.log(res)

  }catch(err){

    console.log(err)
  }
  
}

useEffect(() => {
  GetBrands()

  return () => {
    
  }
}, [Brands])



async function getThisBrand(id) {
  try{
    let res = await  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setThisBrand(res?.data?.data)

 console.log(res)
  }catch(err){
    console.log(err)
  }

}


function go (id){
  getThisBrand(id)
  setDrop("")
}

 
  
  return <>

<div className='mt-[50px] flex flex-wrap gap-5   ' >

  {

    Brands?.map((brand)=>{return<>
      <div onClick={()=>go(brand._id)}  className="max-w-sm bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 lg:w-2/6 sm:w-3/3 md:w-3/3 mx-auto rounded lg:h-[350px] overflow-hidden cursor-pointer">
     <img className="w-full lg:h-[250px] object-cover" src={brand?.image} alt="" />
     <div className="p-5">
       <h5 className="text-center mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2 mt-4">
         {brand?.slug}
       </h5>
     </div>
   </div>
        
       </>})
  }


 
<div onClick={()=>setDrop("hidden")} className={`  absolute top-0 left-0 right-0 bottom-0 bg-opacity-30 bg-black h-[100%] z-50 ${Drop} `}>

 {
  ThisBrand&&<div onClick={()=>setDrop("hidden")} className='p-10 bg-transparent-500 w-fit fixed mx-auto mt-60 flex flex-col justify-center items-center right-[36.8%]'>
  <img className='w-[200%]' src={ThisBrand.image} alt="" />
   </div>
 }

  

</div>
</div>






  
  </>
   
  
}
