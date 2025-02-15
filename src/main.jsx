import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'swiper/css';
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


createRoot(document.getElementById('root')).render(

    <App />
  
)
