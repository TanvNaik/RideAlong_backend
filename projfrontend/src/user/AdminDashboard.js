import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'

const AdminDashboard = () => {

    const [values, setValues] = useState({
        path: "",
        redirect: false
    })

    const {user} = isAuthenticated();
    const handleClick = (name) => (event) =>{
        setValues({...values, path: `/${event.target.id}`, redirect: true})
    } 

    const performRedirect = () =>{
        if(values.redirect){
            return <Navigate to={values.path} />
        }
    }
 
    return (
        <Base title='Welcome to Admin Dashboard'>
            <div className="form-div-outer admin-dash">
                <div className="form-div-inner admin-form ">
                    <br/>
                    <button className="btn-submit btn-admin" id='user-verification' onClick={handleClick("user-verification")}>Verify Users</button> 
                    <br />
                </div>
                <div className='admin-div'>
                    <div className='profile-pic'>{
                        user.profile_pic && (
                            <img src={`http://localhost:8800/image/${user.profile_pic}`} />
                        )
                    }{
                        (!user.profile_pic && (
                            <img src={`http://localhost:8800/image/default_female_pp.png`} />
                        ))}
                    </div><br/>
                   <div>Name: {user.name}</div> 
                   <div>Email: {user.email} </div>
                   <div>Username: {user.username} </div>
                   <div>Role: Admin </div>
                  
                </div>
            </div>
            {performRedirect()}
        </Base>
    )
}
export default AdminDashboard;