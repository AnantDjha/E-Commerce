import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartFlatbed, faCartShopping, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../context/UserContext"
import axios from "axios"
import { faCartFlatbedSuitcase } from "@fortawesome/free-solid-svg-icons/faCartFlatbedSuitcase"


export default function NavBar()
{
    const [prod,setProd] = useState([])

    

    const menuRef = useRef();
    const {user,setUser} = useContext(userContext)

    useEffect(()=>{
        if(!user)
            {
                return
            }
        if(!user.valid)
            {
                
                let list = JSON.parse(localStorage.getItem("cartItems") || "[]")
                // console.log(list);
                        setProd(list)
            }
        else
       { axios.defaults.withCredentials = true;
        axios.post("http://localhost:5000/getCart", { email: user.value.email },
            {
                Headers: {
                    "Content-Type": "application/json"

                }
            }
        )
            .then((response) => {
                let list = response.data
                localStorage.setItem("cartItems",JSON.stringify(list))
                setProd(list)

            })
            .catch((e) => {
                console.log(e);
            })}
    })

    return (
        <div className="mainNav">
            <nav>
                <div className="brandName">
                <FontAwesomeIcon className="menu" icon={faBars} onClick={()=>{
                    menuRef.current.className = "linksToMove insideOut"
                }} />
                    <span>MEDIFY</span>
                </div>

                <div className="linksToMove" ref={menuRef}>
                    <p>MEDIFY <FontAwesomeIcon icon={faMultiply} onClick={()=>{
                    menuRef.current.className = "linksToMove"
                }} /></p>
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to = "/products"><li>Products</li></Link>
                    <Link to = "/"><li>About</li></Link>
                    <Link to = "/orders"><li>My Orders</li></Link>
                </ul>
                <div className="login">
                    <a href="#">{user && (!user.valid ? "Login" : user.value.name)}</a>
                </div>
                </div>
                

                <div className="cart">
                    <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontSize:"20px"}}/><b>{prod.length}</b></Link>
                </div>
            </nav>
        </div>
    )
}