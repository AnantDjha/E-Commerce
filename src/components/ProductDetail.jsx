import "./ProductDetail.css"
import { useNavigate, useParams } from "react-router-dom"
import { products } from "./product.js";
import { useContext, useState, useEffect, useRef } from "react";
import { productContext } from "../context/ProductContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import wellnesImg from "../assets/placeholder.svg"
import { faLaptopMedical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { userContext } from "../context/UserContext";

export default function ProductDetail() {

    const [isInCart, setIsInCart] = useState(JSON.parse(localStorage.getItem("cartItems"),"[]"))
    const { user, setUser } = useContext(userContext)
    const navigate = useNavigate();
    const addToCart = () => {
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/cart",{ email: user.value.email, id: parseInt(param.id), quantity: 1 },{
           
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
        .then((response)=>{
            console.log(response.data);
            if(response.data.message == "succesfull")
                {

                    navigate("/cart");
                }
               
        })
        .catch((e)=>{
            alert("something went wrong")
        })
        

    }

    const param = useParams();
    const handleAdd = () => {
        const paramId = parseInt(param.id, 10);
        const list = JSON.parse(localStorage.getItem("cartItems") || '[]');

        if (list.length == 0) {
            localStorage.setItem("cartItems", JSON.stringify([{ id: paramId, quantity: 1 }]));
        } else if (list.find(a => a.id === paramId)) {
            navigate("/cart")
            return;
        } else {
            list.push({ id: paramId, quantity: 1 }); 
            localStorage.setItem("cartItems", JSON.stringify(list));
        }
        navigate("/cart")


    };


    return (
        !products ? (
            <div>ksdisdjjsdijids</div>
        ) : (
            <div className="mainDetail">
                <div className="detailBox">
                    <h5 className="absoluter">Medify:{">" + products.find(a => a.id === parseInt(param.id)).name +" - " +products.find(a => a.id === parseInt(param.id)).quantity}</h5>
                    <div className="image">
                        <LazyLoadImage src={products.find(a => a.id === parseInt(param.id)).url} alt={"loading......"} effect="blur" placeholderSrc={wellnesImg} />
                    </div>
                    <div className="text">
                        <h2>{products.find(a => a.id === parseInt(param.id)).name} - {products.find(a => a.id === parseInt(param.id)).quantity}</h2>
                        <span className="tagHai">{products.find(a => a.id === parseInt(param.id)).tag[0]}</span>
                        <h4>{products.find(a => a.id === parseInt(param.id)).detail}</h4>

                        <p><b>Brand: </b>{products.find(a => a.id === parseInt(param.id)).brand}</p>

                        <h1>
                            ₹ {products.find(a => a.id === parseInt(param.id)).price} <span>M.R.P</span>
                        </h1>

                        <p id="discount"> <i>Get upto </i> {products.find(a => a.id === parseInt(param.id)).discount}</p>
                        <p>{products.find(a => a.id === parseInt(param.id)).star.map(starP => {
                            if (starP === 1) {
                                return (

                                    <span><i className="fa fa-star fa-sm"></i></span>
                                )
                            }
                            else if (starP === 0) {
                                return (

                                    <span><i className="fa fa-star-half-o fa-sm"></i></span>
                                )
                            }
                            else {
                                return (

                                    <span><i className="fa fa-star-o fa-sm"></i></span>
                                )
                            }
                        })}</p>

                        <h3>About this product</h3>
                        <ul>
                            {products.find(a => a.id === parseInt(param.id)).about.map(q => {
                                return <li key={q[0]}> {q}</li>
                            })}
                        </ul>

                        <button onClick={() => 
                            {
                                if(!user.valid)
                                    {
                                        handleAdd()
                                    }
                                    else{
                                        addToCart()
                                    }
                            }
                        }>{isInCart.find(b => b.id === products.find(a => a.id === parseInt(param.id)).id) ? "Go to cart" :"Add to cart"}</button>
                    </div>
                </div>
            </div>
        )




    )
}