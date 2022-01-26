import React, { useState } from "react"
import "./register.css"
import axios from "axios" //for API calling
import { useNavigate  } from "react-router-dom";

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

    const register = () => {
        const { name, email, password, reEnterPassword, dob, gender } = user
        if( name && email && password && dob && gender && (password === reEnterPassword)){
            // alert("posted")
            axios.post("http://localhost:9002/register", user)
            .then( res =>
                //  console.log(res)
            {
                alert(res.data.message)
                navigate("/login")
            }
            )
        } else {
            alert("invalid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <span>DOB: &nbsp;</span>
            <input type="text" placeholder="DD/MM/YYYY" name="dob" value={user.dob} onChange={ handleChange }/>
            <span>Gender: &nbsp;</span>
            {/* <label htmlFor="male" className="gender">&nbsp;Male&nbsp;
            <input type="radio" id="male" name="gender" value={user.male} onChange={ handleChange }/></label>
            <label htmlFor="female" className="gender">Female&nbsp;
            <input type="radio" id="female" name="gender" value={user.female} onChange={ handleChange }/></label>
            <label htmlFor="nb" className="gender">Non-binary&nbsp;
            <input type="radio" id="nb" name="gender" value={user.nb} onChange={ handleChange }/></label> */}
            <select name="gender" onChange={ handleChange } value={user.gender} >
                <option value=" "> Select.... </option>
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