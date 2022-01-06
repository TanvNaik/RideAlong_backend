import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Base from '../core/Base'

const AdminDashboard = () => {

    const [values, setValues] = useState({
        path: "",
        redirect: false
    })

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
            <div className="form-div-outer">
                <div></div>
                <div className="form-div-inner admin-div">
                    <br/>
                    <button className="btn-submit btn-admin" id='add' onClick={handleClick("add")}>Add City</button> <br/><br/>
                    <button className="btn-submit btn-admin" id='delete' onClick={handleClick("delete")}>Delete City</button> <br/><br/>
                    <button className="btn-submit btn-admin" id='user-verification' onClick={handleClick("user-verification")}>Verify Users</button> 
                    <br />
                </div>
                <div></div>
            </div>
            {performRedirect()}
        </Base>
    )
}
export default AdminDashboard;