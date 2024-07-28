import "./Home.css"
import beauty from "../assets/beauty.jpg"
import medi from "../assets/medi.jpg"
import Wellness from "../assets/wellness.jpeg"
import { products } from "./product"
import { Link, useNavigate } from "react-router-dom"
import { faStar, faStarAndCrescent, faStarHalf, faStarHalfAlt, faStarHalfStroke, faStarOfDavid, faStarOfLife } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { productContext } from "../context/ProductContext"



export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    // const {products,setProducts} = useContext(productContext);
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('load', () => {
          setIsLoading(false);
        });
      },[]);
      
    
    return (
            !products ? (
              <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}></div>
            ) : (
              // Rest of your component
              <div className="mainHome">

            <div className="imageContent">
                <section className="firstContainer">
                    <div>
                        <span>Get valuable discounts</span>
                        <h2>On all products</h2>
                        <h1>Prescribed Medicine</h1>
                        <p>Get discount <b>upto 45%</b></p>
                        <button onClick={()=>{
                            navigate("/products")
                        }}>Shop now</button>
                    </div>

                </section>

            </div>

            <section className="secondSection">
                <Link to="/products/medicine" className="divof2">
                    <img src={medi} alt="" />
                    <div className="outerDiv-divof2">
                        <div>
                            <h2>Medicine</h2>
                            <span>Discount upto 15%</span>
                        </div>
                        <p>➤</p>
                    </div>
                </Link>
                <Link to="/products/wellness" className="divof2" >
                    <img src={Wellness} alt="" id="wellness" />
                    <div className="outerDiv-divof2">
                        <div>
                            <h2>Wellness</h2>
                            <span>Discount upto 13%</span>
                        </div>
                        <p>➤</p>
                    </div>
                </Link>
                <Link to="/products/beauty" className="divof2">
                    <img src={beauty} alt="" />
                    <div className="outerDiv-divof2">
                        <div>
                            <h2>Beauty</h2>
                            <span>Discount upto 20%</span>
                        </div>
                        <p>➤</p>
                    </div>
                </Link>

            </section>

            <section className="mostBuyed">
                <div className="pehla">
                    <h1>Most purchased product</h1>
                    <p>Get it now</p>
                </div>

                <div className="productView">


                    <div className="secondOfView">
                        {products.filter(a => a.id < 5).map(item => {
                            return (
                                <Link to={`productdetail/${item.id}`} className="ItemBox" key={item.id} >
                                    <img src={item.url} alt="" loading="lazy" className="imageOfFilter"/>
                                    <div className="itemDetail"  >
                                    <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                                    <p>{item.quantity}</p>
                                        <h4>₹ {item.price} M.R.P</h4>
                                        <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                        <p style={{ display: "flex", alignItems: "center" }}>{item.star.map(starP => {
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
                                    </div>



                                </Link>
                            )
                        })}
                    </div>

                </div>

            </section>
            <section className="mostBuyedSecond">
                <div className="pehla">
                    <h1 style={{ color: "white" }}>Limited time offer</h1>
                    <p style={{ color: "white" }}>Grab the deal</p>
                </div>

                <div className="productView">


                    <div className="secondOfView">
                        {products.filter(a => a.id >= 5 && a.id < 9).map(item => {
                            return (
                                <Link to={`productdetail/${item.id}`} className="ItemBox"  key={item.id} >
                                    <img src={item.url} alt="" loading="lazy" className="imageOfFilter" />
                                    <div className="itemDetail" >
                                    <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                                    <p>{item.quantity}</p>
                                        <h4>₹ {item.price} M.R.P</h4>
                                        <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                        <p style={{ display: "flex", alignItems: "center" }}>{item.star.map(starP => {
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
                                    </div>



                                </Link>
                            )
                        })}
                    </div>


                </div>

            </section>


        </div>

            )
          
          
        
    )
}
