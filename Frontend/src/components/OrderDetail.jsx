import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetail.css"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import tick from "../assets/tickImg.jpg"
import { products } from "./product";
import { Link } from "react-router-dom";

export default function OrderDetail({ }) {
    const location = useLocation();
    const { item, monthName } = location.state || {};
    const navigate = useNavigate();

    const [packed, setPacked] = useState(false)
    const [shipped, setShipped] = useState(false)
    const [Delivered, setDeliverd] = useState(false)
    const [cart,setCart] = useState([])

    const setProductView = ()=>{
        let list = item.product

        const updatedCart = list.map(element => {

            return products.find(a => a.id === element.id);
        }).filter(item => item !== undefined); // Filter out undefined items if any product is not found
        console.log(updatedCart);

        setCart(updatedCart);
    }

    useEffect(() => {
        if (!item || !monthName) {
            navigate("/orders")
        }

        setProductView()

        if (item.status == "ordered") {
            return;
        }
        else if (item.status == "packed") {
            setPacked(true);
        }
        else if (item.status == "shipped") {
            setPacked(true)
            setShipped(true)
        }
        else {
            setPacked(true)
            setShipped(true)
            setDeliverd(true)
        }
       
        // setProductView()

    }, [])
    return (
        <div className="mainDetailOrder">
            <div className="transection">
                <div className="statusOfOrder">
                    <div className="statusText">
                        <p className="status">Order Detail</p>
                        <p className="date">
                            Ordered on - {monthName[item.orderMonth]} {item.orderDate}
                        </p>
                    </div>
                    <div className="track">
                        <h4>Track Order</h4>
                        <p><div className="imageSectionTick"><img src={tick} alt="" /></div> <span className="textSection"><b>Ordered</b><span>completed on - {monthName[item.orderMonth]} {item.orderDate}</span></span></p>

                        <p><div className="imageSectionTick">{packed && <img src={tick} alt="" />}</div> <span className="textSection"><b>Packed</b>
                            {packed ? <span>completed on - {monthName[item.orderMonth]} {item.orderDate}</span> : <span>Under process</span>}
                        </span></p>

                        <p><div className="imageSectionTick">{shipped && <img src={tick} alt="" />}</div> <span className="textSection"><b>Shipped</b>
                            {shipped ? <span>completed on - {monthName[item.orderMonth]} {item.orderDate}</span> : <span>Under process</span>}
                        </span></p>

                        <p><div className="imageSectionTick">{Delivered && <img src={tick} alt="" />}</div> <span className="textSection"><b>Delivered</b>
                            {Delivered ? <span>completed on - {monthName[item.orderMonth]} {item.orderDate}</span> : <span>Under process</span>}
                        </span></p>
                    </div>

                    <div className="contentOfAddress2" >
                        <h4 style={{fontSize:"20px",marginBottom:"1rem",fontFamily:"Rubik, sans-serif"}}>Delivery Address</h4>
                        <span style={{  width: "95%", display: "flex", justifyContent: "space-between" }}>{item.transaction.address.first} {item.transaction.address.last} </span>
                        <span>{item.transaction.address.mainAddress}</span>
                        <span>{item.transaction.address.landmark}</span>
                        <span>{item.transaction.address.city} - {item.transaction.address.pincode} {item.transaction.address.state}</span>
                        <span>+91-{item.transaction.address.mobile}</span>
                    </div>

                </div>
                <div className="transactionOfOrder">
                    <h4>Transaction detail</h4>
                    <p><span>Order Number</span> : <b>{item.transaction.order_id}</b></p>
                    <p><span>Payment Number</span> : <b>{item.transaction.payment_id}</b></p>
                    <p><span>Order Date</span> : <b>{item.orderDate} {item.orderMonth} {item.orderYear}</b></p>
                    <p><span>Product Total</span> : <b>₹{item.transaction.amount / 100}</b></p>
                    <p><span>Delvery Charge</span> : <b style={{color:"green"}}> FREE</b></p>
                    <p><span>Order Amount</span> : <b> ₹{item.transaction.amount / 100}</b></p>
                    <p><span>Payment Mode</span> : <b>{item.paymentMode}</b></p>
                    <p><i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, animi et distinctio esse unde, hic minus voluptas est fugit possimus veritatis laudantium quae. Aspernatur sed quia quam distinctio at quaerat, alias modi ratione commodi ipsam. Est tenetur nihil exercitationem perspiciatis quas, modi optio suscipit fuga beatae consectetur, autem distinctio consequuntur!</i></p>

                </div>
            </div>

            <div className="productOfTransaction2">
                <h4>Products</h4>
            {cart.map(item1 => {
                                return (<div className="itemBoxCart" key={item1.id}>
                                    <div className="temper">
                                       <img src={item1.url} alt="" />
                                        <Link  className="itemDetailCart" to = {`/productDetail/${item1.id}`} style={{color:"black", textDecoration:"none"}}>
                                            <h4>{item1.name} - {item1.quantity}</h4>
                                            <span>{item1.detail}</span>
                                            <h3 style={{fontSize:"22px"}}>₹ {item1.price}</h3>
                                            <span><i>save {item1.discount}</i></span>
                                        </Link>
                                    </div>
                                    <div className="buttonToIncrease">

                                       

                                        <div className="buttons">
                                         
                                            Quantity : <b>{item.product.find(a => a.id == item1.id).quantity}</b>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
            </div>

        </div>
    )
}