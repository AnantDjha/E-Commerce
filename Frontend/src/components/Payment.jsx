import { useEffect, useRef, useState } from "react";
import "./Payment.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";


export default function Payment() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isSubmitted }
    } = useForm()
    const location = useLocation();
    const { price,cartProduct ,prod} = location.state || 0;
    const navigate = useNavigate()
    const [address, setAddress] = useState([])
    const formRef = useRef(null)
    const [disable, setDisable] = useState(false)
    const [hasFocus, setHasFocus] = useState("");
    const ref = useRef(null)
    const [formValue ,setFormValue] = useState()


    const getAddress = ()=>{
        if (!price || !cartProduct || !prod) {
            navigate("/cart");
        }

        axios.defaults.withCredentials = true;
        axios.get("https://medify-vtrr.onrender.com/address")
            .then((response) => {
                console.log(response.data[0].address);
                setAddress(response.data[0].address);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
       getAddress()
    }, [])

    const handleForm = () => {
        if (formRef.current) {
            formRef.current.className = "toggleAddressForm"
            setDisable(true);
        }
    }


    const onSubmit = (data) => {
        axios.defaults.withCredentials = true;
        axios.post("https://medify-vtrr.onrender.com/addAddress", data , {
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res)=>{
            if(res.data.message == "successful")
                {
                    getAddress()
                    formRef.current.className = "addressForm"
                    setDisable(false)
                }
        })
        .catch((e)=>{
            alert("somethig went wrong"+e)
        })
    }

    useEffect(()=>{
        console.log(formValue);
    },[formValue])

    if (!address) {
        return (
            <p>loading</p>
        )
    }
    return (
        <>
            <div className="tempNav">
                <span>MEDIFY</span>
            </div>

            
            <div className="mainPayment">
                <div className="headerOfPayment">
                    <h1>Order Datail</h1>
                </div>
              
              
                <div className="detailsOfPayment">
                          

                    <div className="address">
                        <p className="ppp"><p>DELEVERY ADDRESS</p></p>
                        {
                            address.map(item => {
                                return (
                                    <div className="contentOfAddress" onClick={()=>{setFormValue(item)}} key={item.mobile}>
                                        <span style={{ fontWeight: "bold", marginBottom: "1rem", width: "95%", display: "flex", justifyContent: "space-between" }}><b>{item.first} {item.last} </b> <input type="radio" name="address" onChange={()=>{
                                            setFormValue(item) 
                                        }} checked={formValue == item}/></span>
                                        <span>{item.mainAddress}</span>
                                        <span>{item.landmark}</span>
                                        <span>{item.city} - {item.pincode} {item.state}</span>
                                        <span>+91-{item.mobile}</span>
                                    </div>
                                )
                            })
                        }
                        <div className="addNewAddress" onClick={handleForm}>
                            <button>Add Address</button>
                        </div>
                    </div>
                    <div className="priceSummary">
                        <div className="priceDetail paymentPriceDetail">
                            <h5>PAYMENT DETAIL</h5>
                            <ul>
                                <li><b>MRP Total</b> <span>₹ {(price + (12 / 100) * price).toFixed(2)}</span></li>
                                <li><b>Additional Discount</b> <span>₹ {((12 / 100) * price).toFixed(2)}</span></li>
                                <li><b>Total Amount</b> <span>₹ {price.toFixed(2)}</span></li>
                                <li><b>Shiping/ Delivery charge</b> <span>₹ 0.00</span></li>
                            </ul>

                            <p ><b>Total Payable</b><span style={{ fontWeight: "bold" }}>₹ {price.toFixed(2)}</span></p>

                            <span><p><i>Payable amount</i><b>₹{price.toFixed(2)}</b></p> {formValue ?<Link  to="/completePayment" state={{ price,cartProduct ,prod,formValue}}>Proceed</Link>:<Link setDisable={!formValue} style={{backgroundColor:"grey",pointerEvents:"none",cursor:"none"}}>Proceed</Link>}</span>
                        </div>
                    </div>
                </div>






            </div>
            {disable && <div className="overlay" onClick={() => {
                formRef.current.className = "addressForm"
                setDisable(false)
            }}></div>}



            <div className="addressForm" ref={formRef}>

                <div className="headerForm">
                    <h3>ADD ADDRESS</h3>
                </div>
                <form className="former" onSubmit={handleSubmit(onSubmit)}>
                    <div className="adder">
                        <p >PINCODE</p>
                        <input type="text" {...register("pincode", {
                            required: { value: true, message: "Enter pincode" }
                        })} maxLength={6} />
                        {errors.pincode && <p className="error">{errors.pincode.message}</p>}
                    </div>
                    <div className="city">
                        <div className="adder">
                            <p >City</p>
                            <input type="text" {...register("city", {
                                required: { value: true, message: "Enter City" }
                            })} />
                            {errors.city && <p className="error">{errors.city.message}</p>}
                        </div>
                        <div className="adder">
                            <p >State</p>
                            <input type="text" {...register("state", {
                                required: { value: true, message: "Enter state" }
                            })} />
                            {errors.state && <p className="error">{errors.state.message}</p>}
                        </div>
                    </div>

                    <div className="adder">
                        <p >FIRST NAME</p>
                        <input type="text" {...register("first", {
                            required: { value: true, message: "Enter first name" }
                        })}  />
                        {errors.first && <p className="error">{errors.first.message}</p>}
                    </div>
                    <div className="adder">
                        <p >LAST NAME</p>
                        <input type="text" {...register("last", {
                            required: { value: true, message: "Enter last name" }
                        })}  />
                        {errors.last && <p className="error">{errors.last.message}</p>}
                    </div>
                    <div className="adder">
                        <p >ADDRESS</p>
                        <input type="text" {...register("mainAddress", {
                            required: { value: true, message: "Enter Address" }
                        })}  />
                        {errors.address && <p className="error">{errors.address.message}</p>}
                    </div>
                    <div className="adder">
                        <p >LANDMARK</p>
                        <input type="text" {...register("landmark", {
                            required: { value: true, message: "Enter Landmark" }
                        })}  />
                        {errors.landmark && <p className="error">{errors.landmark.message}</p>}
                    </div>
                    <div className="adder">
                        <p >PHONE NUMBER</p>
                        <input type="text" {...register("mobile", {
                            required: { value: true, message: "Enter Number" }
                        })}  />
                        {errors.mobile && <p className="error">{errors.mobile.message}</p>}
                    </div>

                    <input type="submit" value={isSubmitting?"wait..." :"ADD"} className="submit" />
                </form>
            </div>

        </>
    )
}