import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { WishContext } from '../../Context/WishList.jsx';



export default function WhishList() {

  const [Wishs, setWishs] = useState(null)
  let { Whish, WishList, WishListRemove } = useContext(WishContext);

  console.log(Wishs,"xxxxxxxxxxxxx")

  console.log(Wishs,"xxxxxxxxxxxxx")


 
     
  useEffect(() => {
    GetWishList()
    
    return () => {
      
    }
  }, [])



  const toggleHeart = (id) => {
    let storedArray = JSON.parse(localStorage.getItem("Heart")) || [];
    WishListRemove(id);  
    storedArray = storedArray.filter(storedId => storedId !== id);
    localStorage.setItem("Heart", JSON.stringify(storedArray));
   setWishs(prevWishs => prevWishs.filter(wish => wish._id !== id));
  };
   
 




  



 

  
  

    async function GetWishList(){
      try{
        let data= await  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
          headers:{
            token:localStorage.getItem("Token")
        }  
        })
        
        setWishs(data?.data?.data)
        

      }catch(err){
        console.log(err)
      }
    }



    
    








  return <>
  <div className=''></div>
  {Wishs?.length > 0?<> <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[50px] h-svh">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Rating
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>

        {
          Wishs?.map((wish,index)=>{return<>
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={wish?.imageCover}className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {wish.title.slice(0, 20) + "..."}
        </td>
        <td className="px-6 py-4">
         {
          wish.ratingsAverage
         }
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {
            wish.price 
          } $
        </td>
        <td className="px-6 py-4">
          <button  className="font-medium text-red-600 dark:text-red-500 hover:underline block" onClick={()=>toggleHeart(wish._id)}>Remove</button>
          
        </td>
      </tr>
          </>})

        }
      
     
    </tbody>
  </table>
</div>
    </>:<div className='flex justify-center items-center mt-[50px] p-52 bg-gray-300'>

<h1 className='text-7xl'>Empty Wish List</h1>


</div>
   








  }







  
  
  </>
}
