import React, { useState, useContext, useEffect } from "react"
import'./LoginPopup.css'
import { assets } from "../../assets/assets"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const[currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}))
    }
    
    const login = async (event)=>{
        event.preventDefault()
        let newUrl = url;
        if(currState==="Login"){
            newUrl+= "/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
       const response = await axios.post(newUrl,data);
       if(response.data.success){
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token);
         setShowLogin(false)
       }
       else{
        alert(response.data.message)
       }
    }
    

    useEffect(() => {
        // Add the no-scroll class to body when the component mounts
        document.body.classList.add('no-scroll');
        window.scrollTo(0, 0);

        // Remove the no-scroll class from body when the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

  return (
    <div className="login-popup">
        <form onSubmit={login} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Your Name" required/>}
                <input type="email" name="email" onChange={onChangeHandler}  value={data.email} placeholder="Your Mail" required/>
                <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Password" required/>
            </div>
            <div className="login-signup-button">
            <button type="submit" >{currState==="Sign Up"?"Create Account":"Login"}</button>
            </div>
            
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            <div>
                {currState==="Login"?
                    <p>Create Account <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    :<p>Already have an Account <span onClick={()=>setCurrState("Login")}>Click here</span></p>
                }
            </div>
        </form>
      
    </div>
  )
}

export default LoginPopup
