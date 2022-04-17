import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Base from "../core/Base"
import { changePassword, checkUsernameAndEmail } from './helper/userapicalls'


const  ForgetPassword = () =>  {

    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        cfpassword: "",
        perror: "",
        cferror: "",
        error: "",
        success: "",
        userId: "",
        check: false
    })
    const { userId, email, password, cfpassword, perror, cferror, username, check, error ,success} = values

    const handleChange = (name) => (event) =>{        
        setValues({...values, [name]: event.target.value})
    }
    const doCheck = (e) => {
        e.preventDefault()

        let obj = {
            email: email,
            username: username
        }
        // check email and username from backend
        checkUsernameAndEmail(obj)
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            }else{
                setValues({...values,error: "", check:true, userId: data._id})
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password == ""){ 
            return setValues({...values, perror:"Please enter password"})
        }
        if(cfpassword == ""){
            return setValues({...values, cferror: "Please enter confirm password"})
        }
        if( password.length < 8){
            return setValues({...values, perror: "Password must be atleast 8 characters and alphanumeric"})
        }
        if(password !== cfpassword){
            return setValues({...values, cferror: "Password and confirm password must match"})
        }
        let obj = {
            _id: userId,
            password: password
        }
        
        //send query to update password
        changePassword(obj)
        .then(data => {
            if( data.error ){
                setValues({...values, error: data.error})
            }else{
                alert(data.message)
                return <Navigate to="../"/>
            }
        })
    }
    const successMessage = () => {
        if(success){
            return (
                <div className="successMessage">
                    <h2>Thank you for your feedback!</h2>
                </div>
            )
        }
    }
    const errorMessage = () =>{
        if(error){
            return (
                <div className="errorMessage">
                    <h2>{error}</h2>
                </div>
            )
        }
    }
    return (
    <Base title="Contact us">
        {successMessage()}
        {errorMessage()}
        <div className="form-div-outer">
                <div></div>
                <div className='form-div-inner'>
                    <form >
                        {!check && (
                            <>
                            <div className="form-group">
                            <label htmlFor="username">
                                Enter your Email: </label> 
                            <input 
                            type="email"
                            id='email'
                            required={true}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Enter your username: </label> 
                            <input 
                            type="text"
                            id='username'
                            required={true}
                            onChange={handleChange("username")}
                            />
                        </div>
                        <button className="btn-submit" onClick={doCheck}>Submit</button>
                            </>
                        )}
                        
                        {
                            check && (
                                <>
                                <h6>Please set new Password</h6>
                                <div className="form-group">
                            <label htmlFor="username">
                                Enter new Password: </label> 
                            <input 
                            type="password"
                            id='password'
                            required={true}
                            onChange={handleChange("password")}
                            /><br/>
                             <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{perror}</span>  </b>                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                               Confirm new Password: </label> 
                            <input 
                            type="password"
                            id='cfpassword'
                            required={true}
                            onChange={handleChange("cfpassword")}
                            /><br/>
                             <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{cferror}</span>  </b>                        
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>Submit</button>
                        </>
                            )
                        }
                        
                    </form>
                    <div></div>
                </div>
                <div></div>
            </div>
    </Base>
  )
}
export default  ForgetPassword;