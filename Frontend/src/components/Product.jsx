import { products } from "./product";
import { useParams } from "react-router-dom";
import "./Product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faQuoteRightAlt, faRightFromBracket, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect, useContext } from "react";
import noResult from '../assets/noResultImg.png'
import { Link } from "react-router-dom";
import { productContext } from "../context/ProductContext";


export default function Product()
{
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//    const {products,setProducts} = useContext(productContext);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    setNumber(1)
    if(windowWidth <= 550)
        {
            setTo(13)
        }
    else if(windowWidth <= 670)
        {
            setTo(4)
        }
    else if(windowWidth <= 951)
        {
            setTo(6)
        }
       
        else{
            setTo(8)
        }
  },[windowWidth])

    const [toIncrease , setTo] = useState(8);
    const [number, setNumber] = useState(1)
    const param = useParams()
    if(window.location.href.endsWith("search") && products.filter(a => a.name.toLowerCase().includes(param.value.substring(0, param.value.indexOf('-')))).length == 0)
        {
            return (
                <div className="noResult" style={{width:"100vw",height:"60vh",display:"flex",justifyContent:"center"}}>
                    <img src={noResult} alt=""  loading="lazy" />
                </div>
            )
        }
    else if(!window.location.href.endsWith("tag") && !window.location.href.endsWith("search"))
        {

        
    return (
        <div className="mainProduct">
            <div className="productList">
                <button className="decrease" disabled = {number === 1} onClick={()=>{setNumber(a => a-toIncrease)}}>{"<"}</button>
                <button className="increase" disabled = {window.location.href.endsWith("products") ? number+toIncrease >= 12 : number+toIncrease >= 8} onClick={()=>{setNumber(a => a+toIncrease)}}>{">"}</button>
                {window.location.href.endsWith("products") ? (
                    products.filter(a => a.id >= number && a.id < number+toIncrease).map(item =>{
                        return (
                            <Link to= {`/productdetail/${item.id}`} className="ItemBoxProduct"  key={item.id} >
                            <img src={item.url} alt="" />
                            <div className="itemDetailProduct" >
                            <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                            <p>{item.quantity}</p>
                                <h4>₹ {item.price} M.R.P</h4>
                                <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                <p style={{display:"flex",alignItems:"center"}}>{item.star.map(starP => {
                                   if(starP === 1){
                                    return (
                                        
                                        <span><i className="fa fa-star fa-sm"></i></span>
                                    )}
                                    else if(starP === 0){
                                        return (
                                        
                                            <span><i className="fa fa-star-half-o fa-sm"></i></span>
                                       )
                                    }
                                    else{
                                        return (
                                        
                                            <span><i className="fa fa-star-o fa-sm"></i></span>
                                       )
                                    }
                                })}</p>
                            </div>



                        </Link>
                        )
                    })
                ) : (
                    
                     products.filter(a => a.type == param.value).length > 0 ? (
                       products.filter(a => a.type == param.value).map(item =>{
                        return (
                            <Link to= {`/productdetail/${item.id}`} className="ItemBoxProduct"  key={item.id} >
                            <img src={item.url} alt="" />
                            <div className="itemDetailProduct" >
                                
                            <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                            <p>{item.quantity}</p>
                                <h4>₹ {item.price} M.R.P</h4>
                                <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                <p style={{display:"flex",alignItems:"center"}}>{item.star.map(starP => {
                                   if(starP === 1){
                                    return (
                                        
                                        <span><i className="fa fa-star fa-sm"></i></span>
                                    )}
                                    else if(starP === 0){
                                        return (
                                        
                                            <span><i className="fa fa-star-half-o fa-sm"></i></span>
                                       )
                                    }
                                    else{
                                        return (
                                        
                                            <span><i className="fa fa-star-o fa-sm"></i></span>
                                       )
                                    }
                                })}</p>
                            </div>



                        </Link>
                        )
                    })
                    ) : (
                            <></>
                     )
                    
                )
            }
            </div>
        </div>
    )
}
else if(window.location.href.endsWith("tag")){
    return (
        <div className="mainProduct">
            <div className="productList">
               
                    {products.filter(a => a.tag.includes(param.value.substring(0, param.value.indexOf('-')))).map(item =>{
                        return (
                            <Link to= {`/productdetail/${item.id}`} className="ItemBoxProduct"  key={item.id} >
                            <img src={item.url} alt="" />
                            <div className="itemDetailProduct" >
                            <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                                <p>{item.quantity}</p>
                                <h4>₹ {item.price} M.R.P</h4>
                                <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                <p style={{display:"flex",alignItems:"center"}}>{item.star.map(starP => {
                                   if(starP === 1){
                                    return (
                                        
                                        <span><i className="fa fa-star fa-sm"></i></span>
                                    )}
                                    else if(starP === 0){
                                        return (
                                        
                                            <span><i className="fa fa-star-half-o fa-sm"></i></span>
                                       )
                                    }
                                    else{
                                        return (
                                        
                                            <span><i className="fa fa-star-o fa-sm"></i></span>
                                       )
                                    }
                                })}</p>
                            </div>



                        </Link>
                        )
                    })
                }
               
            </div>
        </div>
    )
   
}
else if(window.location.href.endsWith("search")){
    return (
        <div className="mainProduct">
            <div className="productList" >
               
                    {products.filter(a => a.name.toLowerCase().includes(param.value.substring(0, param.value.indexOf('-')))).map(item =>{
                        return (
                            <Link to= {`/productdetail/${item.id}`} className="ItemBoxProduct"  key={item.id} >
                            <img src={item.url} alt="" />
                            <div className="itemDetailProduct" >
                            <h2><b>{item.name}</b>  <span>{item.tag[0]}</span></h2>
                            <p>{item.quantity}</p>
                                <h4>₹ {item.price} M.R.P</h4>
                                <p style={{ color: "green" }}>Get upto <b >{item.discount}</b></p>
                                <p style={{display:"flex",alignItems:"center"}}>{item.star.map(starP => {
                                   if(starP === 1){
                                    return (
                                        
                                        <span><i className="fa fa-star fa-sm"></i></span>
                                    )}
                                    else if(starP === 0){
                                        return (
                                        
                                            <span><i className="fa fa-star-half-o fa-sm"></i></span>
                                       )
                                    }
                                    else{
                                        return (
                                        
                                            <span><i className="fa fa-star-o fa-sm"></i></span>
                                       )
                                    }
                                })}</p>
                            </div>



                        </Link>
                        )
                    })
                }
               
            </div>
        </div>
    )
}

}