import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../context/UserContext";
import axios from "axios";

function CompletePayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { price, cartProduct, prod ,formValue} = location.state || {};
    const { user, setUser } = useContext(userContext);
    // const [information,setImformation] = useState(null)

    const [timePass,setTimePass] = useState(false)
    
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    useEffect(() => {
        if (!price || !cartProduct || !prod || !user || !formValue) {
            navigate("/cart");
        }
        axios.defaults.withCredentials = true
        axios.post("https://medify-vtrr.onrender.com/razorpay", {amount:price} ,{
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then((res)=>{

            // setImformation(res.data);
            displayRazorPay(res.data)
                
        })
        .catch((e)=>{
            alert("Something went wrong")
            navigate("/cart")
        })

       
    }, [price, cartProduct, prod, user, navigate]);

    async function displayRazorPay(information) {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("something went wrong");
            return;
        }
        var options = {
            "key": "rzp_test_gI00jflkRvp85R", // Enter the Key ID generated from the Dashboard
            "amount": (information.amount).toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "MEDIFY", //your business name
            "description": "Medicine purchased",
            handler: function (response){
                axios.defaults.withCredentials = true;
                axios.post("https://medify-vtrr.onrender.com/addPaymentToDB", {order_id:response.razorpay_order_id, 
                    payment_id:response.razorpay_payment_id,
                    signature:response.razorpay_signature,
                    amount:information.amount,
                    address:formValue
                },
                {
                    headers:{
                        "Content-Type": "application/json"

                    }
                }
            )
            .then((res)=>{
                alert("success")
                if(!res)
                    {
                        alert
                    }
                if(res.data.message == "ok")
                    {
                        navigate("/cart")
                    }
                  
            })
            .catch((e)=>{
               alert(e)
            })
            },
            "image": "https://example.com/your_logo",
            "order_id":information.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": user.value.name, //your customer's name
                "email": user.value.email,
                "contact": user.value.mobile //Provide the customer's phone number for better conversion rates 
            },
            
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <div className="mainComplete">
        </div>
    );
}

export default CompletePayment;
