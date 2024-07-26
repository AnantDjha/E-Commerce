import { useContext, useEffect, useState } from "react"
import "./Orders.css"
import axios from "axios"
import { products } from "./product"
import { Link, useNavigate } from "react-router-dom"
import {userContext} from "../context/UserContext"

export default function Orders()
{
    const {user ,setUser} = useContext(userContext)
    const [orderedProduct , setOrderedProduct] = useState([])
    const [monthName,setMonthName] = useState(["January","February","March","April","May","June","July","August","September","October","November","December"])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user)
        {
            navigate("/home")
            navigate("/orders")
            
        }
        else if(!user.valid)
        {
            navigate("/login");
            return;
        }

        axios.defaults.withCredentials= true;
        axios.get("https://medify-vtrr.onrender.com/getOrders")
        .then((response)=>{
            
            setOrderedProduct(response.data);
        })
        .catch((e)=>{
            alert(e)
        })
    },[user])
    return (
        <div className="mainOrders">
            <div className="orderDetailBox">
               <div className="myOrder">
               <h2>My Orders</h2>
                </div>  
                {orderedProduct.map(item =>{
                    return (
                        <Link to = {`/order-detail/${item.transaction.order_id}`} state = {{item,monthName}} className="orderBox">
                            <div className="imageSection">
                                {item.product.slice(0,4).map(temp =>{
                                    return (
                                        <img src={products.find(a => a.id === temp.id).url} alt="" />
                                    )
                                })}
                               
                               
                            </div>
                            <div className="textDetail">
                                <p className="status">{capitalizeFirstLetter(item.status)}</p>

                                <p className="date">Ordered on - {monthName[item.orderMonth]} {item.orderDate}</p>
                                <p className="number">Medicine {"("+ item.product.length + " items" +")"}</p>
                            </div>
                            <span>{">"}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}