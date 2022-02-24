import React, {useEffect, useState} from 'react'
import { isAuthenticated } from '../authentication/helper'

import Base from '../core/Base'
import { getUser } from './helper/userapicalls'

const UpdateProfile = () => {
    const {user,token}= isAuthenticated()
    const [values, setValues] = useState({
        name: "",
        username: "",
        password: "",
        cfPassword: "",
        pp: "",
        email:"",
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
        email,
        gender,
        contact_number,
        error,
        loading,
        didRedirect,
        formData
     } = values

     const onSubmit = (event) =>{
        event.preventDefault();
        if(!(password === cfPassword)){
            setValues({...values,error: "Password and Confirm Password must match"})
        }
        setValues({...values, error: "",loading: true});
        
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
    })
    const handleChange = (name) => (event) =>{
        const value = (name === "document" || name === "pp")? event.target.files[0] : event.target.value;
        
        formData.set(name,value)
        setValues({...values, [name]: value})
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
                            required={true}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Enter New Password: </label>
                            <input 
                            type="password" 
                            id='password' 
                            required={true}
                            onChange={handleChange("password")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-password">Confirm New Password: </label>
                            <input 
                            type="password" 
                            required={true}
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
                        <button className="btn-submit" onClick={onSubmit}>SignUp</button>
                    </form>
                    <div></div>
                </div>
                <div></div>
            </div>
        )
    }
  return (
    <Base title='Update your Profile'>
        {showForm()}
    </Base>
  )
}
export default UpdateProfile