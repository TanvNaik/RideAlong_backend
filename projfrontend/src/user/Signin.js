import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated, authenticate, signin } from '../authentication/helper';
import Base from '../core/Base';


const SignIn = () => {

    const [values, setValues] = useState({
        username: "abcdef",
        password: "1234",
        error:"",
        loading: false,
        didRedirect: false
    });

    const {username, password, error,loading, didRedirect} = values;
    const {user} = isAuthenticated();

    const handleChange = (name) => (event)=>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, loading:true, error:false});

        signin({username, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})
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
        /* try{
            const response = await axios.post(`${API}/signin`,{username,password});
            authenticate(response.data);
            setValues({...values, error: response.data.err.msg, loading:false, didRedirect: true})

        }catch(err){
            console.log(err.msg)
        } */
        
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

    const errorMessage = () =>{
        return(
        <div className="errorMessage" style={{display: error ? "" : "none" }}>
            {error}
        </div>
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
                            <input type="text" id='username' onChange={handleChange("username")}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password" >Password: </label>
                            <input type="password" id='password'  onChange={handleChange("password")}/>
                        </div>
                        <div className='btn-newaccount form-group'>
                            Doesn't have an account?<Link to='../signup' >SignUp</Link>
                        </div>
                        <br/>
                        <button className='btn-submit' onClick={onSubmit}>Submit</button>
                    </form>
                </div>
                <div className="placeholder"></div>

            </div>
        )
    }

    const redirectToSignUp = () =>{
        return (
            <Link to={"/signup"} />
        )
    }
    return (
       <Base
        title='Login'
        > 
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default SignIn
