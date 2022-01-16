import React, {useEffect, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { signup } from '../authentication/helper'
import Base from '../core/Base'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        username: "",
        password: "",
        cfPassword: "",
        pp: "",
        document: "",
        gender:"",
        contact_number: "",
        error: false,
        loading: false,
        didRedirect: false,
        formData: new FormData()
        // html data should be converted into form data
    })

    const {
        name,
        username,
        password,
        cfPassword,
        document,
        pp,
        gender,
        contact_number,
        error,
        loading,
        didRedirect,
        formData
     } = values


    const performRedirect = () =>{
        if(didRedirect){
            return <Navigate to="../"/>
        }
    }

    const errorMessage = () =>{
        return(
        <div className="errorMessage" style={{display: error ? "" : "none" }}>
            {error}
        </div>
        )
    }

    const onSubmit = (event) =>{
        event.preventDefault();

        if(!(password === cfPassword)){
            setValues({...values,error: "Password and Confirm Password should match"})
        }

        setValues({...values, error: "",loading: true});
        signup(formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading:false})
            }
            else{
                setValues({
                    ...values,
                    loading: false,
                    didRedirect:true
                })
            }
        })
    }

    const handleChange = (name) => (event) =>{
        const value = (name === "document" || name === "pp")? event.target.files[0] : event.target.value;
        
        formData.set(name,value)
        setValues({...values, [name]: value})
    }

    const signUpForm = ()=>{
        return (
            <div className="form-div-outer">
                <div></div>
                <div className='form-div-inner'>
                    <form >
                        <div className="form-group">
                            <label htmlFor="pp">Profile Pic: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="pp"
                                id='pp'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("pp")}
                            />         
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name: </label> 
                            <input 
                            type="text"
                            id='name' 
                            required={true}
                            onChange={handleChange("name")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username: </label> 
                            <input 
                            type="text"
                            id='username'
                            required={true}
                            onChange={handleChange("username")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                            type="email" 
                            id="email" 
                            required={true}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input 
                            type="password" 
                            id='password' 
                            required={true}
                            onChange={handleChange("password")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-password">Confirm Password: </label>
                            <input 
                            type="password" 
                            required={true}
                            id='cf-password'
                            onChange={handleChange("cfPassword")} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">
                                Gender: </label> 
                            
                            <input type="radio" value="Male" name="gender" onChange={handleChange("gender")} /> Male
                            <input type="radio" value="Female" name="gender" onChange={handleChange("gender")} /> Female
                        </div>
                        <div className="form-group">
                            <label htmlFor="mob-number">Mobile number: </label>
                            <input 
                            type="text" 
                            id='mob-number'
                            required={true}
                            onChange={handleChange("contact_number")} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="document">Document: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="document"
                                id='document'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("document")}
                            />         
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>SignUp</button>
                    </form>
                    <div></div>
                </div>
                <div></div>
            </div>
        )
    }
    return (
        <Base title='SignUp'>
            {errorMessage()}
            {signUpForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signup;