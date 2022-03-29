import React, {useEffect, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { signup } from '../authentication/helper'
import Base from '../core/Base'

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        cfPassword: "",
        pp: "",
        document: "",
        gender:"",
        contact_number: "",
        error: [false],
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



    const onSubmit = (event) =>{
        event.preventDefault();

        setValues({...values, error: "",loading: true});
        signup(formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading:false})
            }
            else{
                alert("Successfully Registered")
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
            <div className="signup-form-div-outer" >

                    <form >
                        <div className="inner-parent">
                        <div className="signup-inner">
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
                            /><br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "pp") return err.msg
                            })}</span>  </b>           
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name<span className="required">*</span> : </label> 
                            <input 
                            type="text"
                            id='name' 
                            required={true}
                            onChange={handleChange("name")}
                            /><br/>
                            <b><span className="errorMessage" >{error && error.slice(0,10).map((err) => {
                                if(err.param === "name") return (<>
                                {err.msg}<br/>
                                </>)
                            })}</span>  </b>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username<span className="required">*</span> : </label> 
                            <input 
                            type="text"
                            id='username'
                            required={true}
                            onChange={handleChange("username")}
                            /><br/>
                            <b><span className="errorMessage" >{error && error.slice(0,10).map((err) => {
                                if(err.param === "username") return (<>
                                {err.msg}<br/>
                                </>)
                            })}</span>  </b>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <span className="required">*</span> : </label>
                            <input 
                            type="email" 
                            id="email" 
                            required={true}
                            onChange={handleChange("email")}
                            /><br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "email") return err.msg
                            })}</span>  </b>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password<span className="required">*</span> : </label>
                            <input 
                            type="password" 
                            id='password' 
                            required={true}
                            onChange={handleChange("password")}
                            /><br/>
                            <b><span className="errorMessage" >{error && error.slice(0,10).map((err) => {
                                if(err.param === "password") return (<>
                                {err.msg}<br/>
                                </>)
                            })}</span>  </b>  
                        </div>
                        </div>
                        
                        <div className="signup-inner">
                       
                        <div className="form-group">
                            <label htmlFor="cf-password">Confirm Password<span className="required">*</span> : </label>
                            <input 
                            type="password" 
                            required={true}
                            id='cf-password'
                            onChange={handleChange("cfPassword")} 
                            /><br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "cfPassword") return err.msg
                            })}</span>  </b>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">
                                Gender <span className="required">*</span> : 
                            
                            <input type="radio" value="Male" name="gender" onChange={handleChange("gender")} /> Male &nbsp;
                            <input type="radio" value="Female" name="gender" onChange={handleChange("gender")} /> Female
                            </label><br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "gender") return err.msg
                            })}</span>  </b>  
                        </div>
                        <div className="form-group">
                            <label htmlFor="mob-number">Mobile number <span className="required">*</span> : </label>
                            <input 
                            type="text" 
                            id='mob-number'
                            required={true}
                            onChange={handleChange("contact_number")} 
                            /><br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "contact_number") return err.msg
                            })}</span>  </b>  
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="document">Document <span className="required">*</span>: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="document"
                                id='document'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("document")}
                            />   <br/>
                            <b><span className="errorMessage" >{error && error.map((err) => {
                                if(err.param === "document") return err.msg
                            })}</span>  </b>        
                        </div>
                        </div>
                        
                        
                        </div>
                        <div style={{"textAlign": "center"}}>
                        <button className="btn-submit" style={{"width": "10%", "padding": "10px"}} onClick={onSubmit}>SignUp</button>
                        </div>
                       
                    </form>
              
             
            </div>
        )
    }
    return (
        <Base title='SignUp'>
            {error && error.map((err) => {
                if (err.param == 'general')
                return( <div className="errorMessage">
                <h2 style={{"fontSize": "1.2rem"}}>{err.msg}</h2>
            </div>)
            })}
            {signUpForm()}
            <div style={{'height': "3rem"}}></div>
          
            {performRedirect()}
        </Base>
    )
}

export default Signup;