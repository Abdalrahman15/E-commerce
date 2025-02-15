import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/UserCart.jsx';
import { WishContext } from '../../Context/WishList.jsx';

export default function Card({ go }) {
  let { price, imageCover, title, _id, description, ratingsAverage } = go;
  let { addToCart } = useContext(CartContext);
  let { Whish, WishList, WishListRemove } = useContext(WishContext);
  const [HeartColor, setHeartColor] = useState("fa-solid fa-heart text-3xl")
  const [Heart, setHeart] = useState(false);








  useEffect(() => {
    if (_id) {
      const storedHearts = JSON.parse(localStorage.getItem("Heart")) || [];
      if (storedHearts.includes(_id)) {
        setHeart(true);
        setHeartColor("text-red-500");
      }
    }
  }, [_id]);
  
 
  const toggleHeart = () => {
    let storedArray = JSON.parse(localStorage.getItem("Heart"))||[] ; 
  
    if (Heart==false) {
      WishList(_id);
      setHeartColor("text-red-500");
      setHeart(true)
  
      if (!storedArray.includes(_id)) { 
        storedArray.push(_id);
        localStorage.setItem("Heart", JSON.stringify(storedArray));
      }
    } else {
      WishListRemove(_id);
      setHeartColor("fa-solid fa-heart text-3xl");
  
      storedArray = storedArray.filter(id => id !== _id); 
      localStorage.setItem("Heart", JSON.stringify(storedArray));
    }
    
    setHeart(!Heart);
  };
  

  return <>
    <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col justify-between">
      <Link to={`/productsDetails/${_id}`}>
        <h1 className="text-center text-lg font-semibold">{title}</h1>
        <div className="flex justify-center">
          <img className="w-[30%] h-48 object-cover rounded-lg" src={imageCover} alt="product image" />
        </div>
        <div className="px-5 pb-5">
          <h5 className="text-sm text-gray-600 dark:text-gray-400">
            {description.slice(0, 100) + "..."}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse mt-1">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {ratingsAverage}
              </span>
            </div>
          </div>
          <div className="">
            <span className="text-xl font-bold text-gray-900 dark:text-white">{price}$</span>
          </div>
        </div>
      </Link>
      <div className="mt-3 relative">
        
        <span className="absolute right-[11px] -top-[60px] cursor-pointer" onClick={toggleHeart}>
          <i className={`fa-solid fa-heart text-3xl ${HeartColor}`}></i>
        </span>
        <button onClick={() => addToCart(_id)}
          className="w-full text-white bg-main hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add to cart
        </button>
      </div>
    </div>
  </>
}
