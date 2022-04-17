import React, {useEffect, useState} from 'react'
import { isAuthenticated } from '../authentication/helper'

import Base from '../core/Base'
import { getUser, updateUser } from './helper/userapicalls'

const UpdateProfile = () => {
    const {user,token}= isAuthenticated()
    const [values, setValues] = useState({
        name: "",
        username: "",
        password: "",
        cfPassword: "",
        email:"", 
        contact_number: "",
        error: false,
        success: "",
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
        email,
        success,
        contact_number,
        error,
        loading
     } = values

     const onSubmit = (event) =>{
    
        event.preventDefault();
        setValues({...values,error: ""})
        if(!(password === cfPassword)){
            setValues({...values,error: "Password and Confirm Password must match"})
        }else{
            let userobj = {
                username: username,
                password: password,
                contact_number: contact_number
            }


            setValues({...values, error: "",loading: true});
            updateUser(user._id, token, userobj)
            .then(data => {
                if (data.error){
                    setValues({...values, loading: false, error: data.error})
                }else{
                    setValues({...values,loading: false, success: "Profile updated successfully"})
                }
            })
        }
        
        
    }
    const loadingMessage = () =>{
        if(loading){
            return (
                <div className="loadingMessage">
                    <h2>Loading...</h2>
                </div>
            )
        }
    }
    const successMessage = () => {
        if(success){
            return (
                <div className="successMessage">
                    <h2>{success}</h2>
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
    useEffect(()=>{
        getUser(user._id, token, user._id)
        .then(data=> {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                let user = data.user
                setValues({...values,
                name: user.name,
                username: user.username,
                email: user.email,
                contact_number: user.contact_number
            })
            }
        })
    },[])
    const handleChange = (name) => (event) =>{
        setValues({...values, [name]: event.target.value})
    }
    const showForm = () => {
        return (
            <div className="form-div-outer">
                <div></div>
                <div className='form-div-inner'>
                    <form >
                        <div className="form-group">
                            <label htmlFor="name">
                                Name: </label> 
                            <input 
                            type="text"
                            id='name' 
                            disabled
                            value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username: </label> 
                            <input 
                            type="text"
                            id='username'
                            value={username}
                            required={true}
                            onChange={handleChange("username")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                            type="email" 
                            id="email" 
                            value={email}
                            disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Enter New Password: </label>
                            <input 
                            type="password" 
                            id='password' 
                            required={true}
                            value={password}
                            onChange={handleChange("password")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-password">Confirm New Password: </label>
                            <input 
                            type="password" 
                            required={true}
                            value={cfPassword}
                            id='cf-password'
                            onChange={handleChange("cfPassword")} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mob-number">Mobile number: </label>
                            <input 
                            type="text" 
                            id='mob-number'
                            required={true}
                            value={contact_number}
                            onChange={handleChange("contact_number")} 
                            />
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>Update Changes</button>
                    </form>
                    <div></div>
                </div>
                <div></div>
            </div>
        )
    }
  return (
    <Base title='Update your Profile'>
        {successMessage()}
            {loadingMessage()}
            {errorMessage()}
        {showForm()}
    </Base>
  )
}
export default UpdateProfile