import { useEffect, useState, useContext } from 'react';
import NavBar from './components/NavBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Product from "./components/Product"
import Search from './components/Search';
import Tags from './components/Tags';
import ProductDetail from './components/ProductDetail';
import { productContext } from './context/ProductContext';
import axios from 'axios';
import Cart from './components/Cart';
import { userContext } from './context/UserContext';
import Login from './components/Login';
import Payment from './components/Payment';
import CompletePayment from './components/CompletePayment';
import Orders from './components/Orders';
import OrderDetail from './components/OrderDetail';

function App() {
  const { products, setProducts } = useContext(productContext);
  const {user , setUser} = useContext(userContext)
  const [prod, setProd] = useState([]);
  

  

  useEffect(()=>{
    axios.defaults.withCredentials = true
    axios.get("https://medify-vtrr.onrender.com/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },[])
  
  const router = createBrowserRouter([
    { path: "/", element: <><Home /><Search /><NavBar /></> },
    { path: "/products/:value", element: <><Tags /><Product/><Search /><NavBar /></> },
    { path: "/products", element: <><Tags /><Product /><Search /><NavBar /></> },
    { path: "/productdetail/:id", element: <><ProductDetail value = {{prod, setProd}}/><Search /><NavBar /></> },
    { path:"/cart" , element:<><Cart value={{prod, setProd}}/><Search /><NavBar /></>},
    {path:"/login",element:<><Login/></>},
    {path:"/payment",element:<><Payment/></>},
    {path:"/completePayment",element:<><Payment/><CompletePayment/></>},
    {path:"/orders",element:<><Orders/><Search /><NavBar /></>},
    {path:"/order-detail/:id",element:<><OrderDetail/><Search /><NavBar /></>}
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
