import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import { showUnverifiedUsers } from './helper/adminapicalls'

const UserVerification = () => {

    const [values, setValues] = useState({
        name: "",
        document: "",
        status: "",
        users:[],
        loading: "",
        error: "",
        success: "",
    })

    const {
        name,
        document,
        status,
        users,
        loading,
        error,
        success
    } = values
    const {user, token} = isAuthenticated();

    const preload = () => {
        showUnverifiedUsers(user._id,token).then(
            data => {
                if(data.error){
                    setValues({...values, error: data.error})
                }else{
                    console.log(data)
                    setValues({...values, users:  data.users })
                }
            }
        )
    }

    useEffect(()=>{
        preload()
    }, [])
    

    const showPendingVerifications = () => {
        return (
            <div className="userVerification-outer">
                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Document</th>
                        <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(users)}
                        {users && users.map((user,key)=>{
                            return(
                                <div>
                                    {user.name}
                                    {user.verificationStatus}
                                    <img src={user.document.data.data} />
                                    
                                    {/* <img src="data:image/<%=image.img.contentType%>;base64,
                                    <%=image.img.data.toString('base64')%>" /> */}
                                </div>
                               /*   <tr key={key}>
                                    <td>{user.name}</td>
                                    <td>{user.document}</td>
                                    <td>{user.verificationStatus}</td>
                                </tr>  */
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <Base title="User Verification">
            <h2>add table and load all users whose VerificationStatus is false</h2>
            {showPendingVerifications()}
        </Base>
    )
}

export default UserVerification
