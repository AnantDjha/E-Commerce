import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
export default function Login()
{
    const {
        register,
        handleSubmit,
        watch,
        formState:{error,isSubmitting}
    } = useForm()
    const [temp, setTemp] = useState(null)
    const onSubmit = (data)=>{
        axios.defaults.withCredentials = true
        axios.post("https://medify-vtrr.onrender.com/login",data,{
           
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials:true
        })
        .then((response)=>{
           setTemp(response.data)
        })
        .catch((e)=>{
            console.log(e);
        })
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>{temp && temp.message}</p>
            <input 
                type="email"
                {...register("email",{required:true})}
                placeholder="Enter your Email"
            />
            <input 
                type="password" 
                {...register("password",{required:true})}
                placeholder="Enter your password"
            />

            <input type="submit" value="Submit"  disabled={isSubmitting}/>
        </form>
    )
}