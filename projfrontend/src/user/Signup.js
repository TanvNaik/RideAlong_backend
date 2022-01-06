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
        profile_pic: "",
        images: [],
        document: "",
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
        profile_pic,
        images,
        contact_number,
        error,
        loading,
        didRedirect,
        formData
     } = values


    const performRedirect = () =>{
        if(didRedirect){
            console.log("redirect")
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


        setValues({...values, error: "",images: [profile_pic, document] ,loading: true});
        formData.set(images, images)
        signup(formData)
        .then(data => {
            console.log(data)
            if(data.error){
                console.log("error",data.error)
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
        const value = name === "document" ? event.target.files[0] : event.target.value;
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
                            <label htmlFor="profile_pic">Profile Pic: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="profile_pic"
                                id='profile_pic'
                                required="true"
                                accept='image/*'
                                onChange={handleChange("profile_pic")}
                            />         
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name: </label> 
                            <input 
                            type="text"
                            id='name' 
                            required="true"
                            onChange={handleChange("name")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username: </label> 
                            <input 
                            type="text"
                            id='username'
                            required="true" 
                            onChange={handleChange("username")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                            type="email" 
                            id="email" 
                            required="true"
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input 
                            type="password" 
                            id='password' 
                            required="true"
                            onChange={handleChange("password")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-password">Confirm Password: </label>
                            <input 
                            type="password" 
                            required="true"
                            id='cf-password'
                            onChange={handleChange("cfPassword")} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mob-number">Mobile number: </label>
                            <input 
                            type="text" 
                            id='mob-number'
                            required="true"
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
                                required="true"
                                accept='image/*'
                                onChange={handleChange("document")}
                            />         
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>SignUp</button>
                    </form>
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