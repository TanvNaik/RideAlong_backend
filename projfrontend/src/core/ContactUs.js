import React, { useState } from 'react'
import Base from "./Base"
import { sendEmail } from './helper/coreapicalls'


const  ContactUs = () =>  {

    const [values, setValues] = useState({
        message: "",
        email: "",
        error: "",
        success: ""
    })
    const {message, email, error ,success} = values

    const handleChange = (name) => (event) =>{        
        setValues({...values, [name]: event.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(email == ""){ 
            return setValues({...values, error:"Please provide your email Id"})
        }
        if(message == ""){
            return setValues({...values, error: "Message cannot be empty"})
        }
        
        const reqobj = {
            email: email,
            message: message
        }
        sendEmail(reqobj).then(data => {
            if(data.error){
                setValues({...values, error: "Unable to send mail"})
            }else{
                setValues({...values, success: true, error:""})
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
                        <div className="form-group">
                            <label htmlFor="username">
                                Email: </label> 
                            <input 
                            type="email"
                            id='email'
                            required={true}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                 </label> 
                            <textarea
                            id='message' 
                            rows={10}
                            required={true}
                            placeholder="Write message or queries..."
                            onChange={handleChange("message")}
                            />
                        </div>
                        
                        <button className="btn-submit" onClick={onSubmit}>Send</button>
                    </form>
                    <div></div>
                </div>
                <div></div>
            </div>
    </Base>
  )
}
export default  ContactUs