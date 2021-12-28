import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {testRoute} from "../admin/helper/adminapicalls"
import { API } from '../backend';
import Base from '../core/Base';


const SignIn = () => {
    const signInForm = () =>{
        return (
            <div className='form-div-outer'>
                <div className='form-div-inner'>
                    <form >
                        <div className='form-group'>
                            <label htmlFor="email">Email Id: </label>
                            <input type="email" id='email'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id='password' />
                        </div>
                        <span className='btn-newaccount'>Doesn't have an account? <a href="#">Signup</a></span>
                        <br/>
                        <button className='btn-submit'>Submit</button>

                    </form>
                </div>
            </div>
        )
    }
    return (
       <Base
        title='Login'
        > 
        {signInForm()}
        </Base>
    )
}

export default SignIn
