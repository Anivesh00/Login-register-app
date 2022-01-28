import React, { useState } from "react"
import "./register.css"
import axios from "axios" //for API calling
import { useNavigate  } from "react-router-dom";
import validator from 'validator'

const Register  = () => {
    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: "",
        dob: "",
        gender: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        console.log(name, value)
        
        setUser({
            ...user,
            [name]: value
        })
    }
    function focusFunction(){
        const para = document.createElement("p");
        para.innerHTML = "Password minimum Length is 8, minimum 1 Lowercase, minimum 1 Uppercase, atleast 1 Number and minimum 1 Symbols required";
        document.getElementById("discBox").appendChild(para);
        document.addEventListener("focus", focusFunction)
    }

    function blurFunction(){
        document.getElementById("discBox").style.display ="none";
    }

    function focusFunction1(){
        const para1 = document.createElement("p");
        para1.innerHTML = "Email must be in __@__.__  Example:- xyz@abc.com";
        document.getElementById("discBox1").appendChild(para1);
        document.addEventListener("focus", focusFunction1)
    }

    function blurFunction1(){
        document.getElementById("discBox1").style.display ="none";
    }

    const register = () => {
        const { name, email, password, reEnterPassword, dob, gender } = user
        if( name && email && password && dob && gender && 
            (validator.isEmail(email)) &&
             (validator.isStrongPassword(password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) && (password === reEnterPassword)){
            axios.post("http://localhost:9002/register", user)
            .then( res =>
            {
                alert(res.data.message)
                navigate("/login");
            }
            )
        } else {
            alert("invalid input! Please check the password and email ")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange } onFocus={ focusFunction1 } onBlur={ blurFunction1 }></input>
            <div id="discBox1" className="discBox"></div>
            <input type="password"  name="password" value={user.password} placeholder="Your Password" onChange={handleChange} onFocus={ focusFunction } onBlur={ blurFunction }></input>
            <div  id="discBox" className="discBox"></div>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <span>DOB: &nbsp;</span>
            <input type="text" placeholder="DD/MM/YYYY" name="dob" value={user.dob} onChange={ handleChange }/>
            <span>Gender: &nbsp;</span>
            <select name="gender" onChange={ handleChange } value={user.gender} >
                <option> Select.... </option>
                <option value="male"> Male </option>
                <option value="female"> Female </option>
                <option value="other"> Other </option>
            </select>
            <div className="button" onClick={register} >Register</div>
            <div>or </div>
            <div className="button" onClick={() => {navigate("/login")}}>Login</div>
        </div>
    )
}

export default Register