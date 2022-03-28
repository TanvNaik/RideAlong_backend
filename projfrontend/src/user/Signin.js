import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated, authenticate, signin } from '../authentication/helper';
import Base from '../core/Base';


const SignIn = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
        error:"",
        eerror: "",
        perror: "",
        loading: false,
        didRedirect: false
    });

    const {username, password,perror, eerror, error,loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = (name) => (event)=>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, loading:true, error:false, perror: "", eerror: ""});
        console.log(username)
        if(username === ""){
             setValues({...values, eerror: "Please enter username"})
        }
        else if(password === ""){
             setValues({...values,eerror: "", perror: "Please enter password"})
        }else{

        signin({username, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error,perror: "", eerror: "", loading: false})
            }
            else{
                authenticate(data,()=>{
                    setValues({
                        ...values, 
                        didRedirect: true
                    })
                })
            }
        })
        .catch((err)=>console.log("Signin request failed!"))
    }
    }

    const performRedirect = () =>{
        if(didRedirect){
            if(user && user.role === 1){
                return <Navigate to="/admin-dashboard" replace={true} />
            }
            else{
                return <Navigate to="/choose-role" />
            } 
        }
    }

    const loadingMessage = ()=>{
        return(
            loading && (
                <div className="loadingMessage">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    

    const signInForm = () =>{
        return (
            <div className='form-div-outer'>
                <div className="placeholder"></div>
                <div className='form-div-inner'>
                    <form >
                        <div className='form-group'>
                            <label htmlFor="username" >Username: </label>
                            <input type="text" id='username' onChange={handleChange("username")}/><br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{eerror}</span>  </b>  
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password" >Password: </label>
                            <input type="password" id='password'  onChange={handleChange("password")}/><br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{perror}</span>  </b>  
                        </div>
                        <div className='btn-newaccount form-group'>
                            Doesn't have an account? <Link to='../signup' ><b>SignUp</b></Link>
                        </div>
                        <div className='btn-newaccount form-group'>
                             <Link to='../forget-password' ><b>Forget Password</b></Link>
                        </div>
                        <br/>
                        <button className='btn-submit' onClick={onSubmit}>Submit</button>
                    </form>
                </div>
                <div className="placeholder"></div>

            </div>
        )
    }
    return (
       <Base
        title='Login'
        > 
        {error && error.map((err) => {
                if (err.param == 'general')
                return( <div className="errorMessage">
                <h2 style={{"fontSize": "1.2rem"}}>{err.msg}</h2>
            </div>)
            })}
            {loadingMessage()}
            {signInForm()}
            {performRedirect()}
            
        </Base>
    )
}

export default SignIn
