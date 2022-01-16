import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import { showUnverifiedUsers, verifyUsersbyId } from './helper/adminapicalls'


Modal.setAppElement("#root")
/* Partially done, show document in modal window */
const UserVerification = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [values, setValues] = useState({
        name: "",
        document: "",
        status: "",
        users:[],
        loading: "",
        error: "",
        success: ""
    })

    let subtitle;

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

    const openModal = () => {
        setModalIsOpen(true)
    }
    
    const closeModal = () => {
        setModalIsOpen(false)
    }
    const preload = () => {
        showUnverifiedUsers(user._id,token).then(
            data => {
                if(data.error){
                    setValues({...values, error: data.error})
                }else{
                    setValues({...values, users:  data.users })
                }
            }
        )
    }
    const errorMessage = () =>{
        return(
        <div className="errorMessage" style={{display: error ? "" : "none" }}>
            {error}
        </div>
        )
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

    useEffect(()=>{
        preload()
    }, [])

    const verifyUser = (id) => {

        setValues({...values, loading: true})
        
        verifyUsersbyId(user._id, token, {userId: id}).
        then( data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }
            else{
                setValues({
                    ...values,
                    loading: false,
                    success: "User Verified succesfully",
                })
                setTimeout(preload,2000)
            }
        })
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
    
    const showPendingVerifications = () => {
        return (
            <div id="UserVerification" className="userVerification-outer">
                <table border="1px solid black" className='userVerification-table'>
                    <thead>
                        <tr>
                        <th className='tdname'>Name</th>
                        <th className='tddocument'>Document</th>
                        <th className='tdstatus'>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user,key)=>{
                            return(
                                <tr key={key}>
                                    <td className='tdname'>{user.name}</td>
                                    <td className='tddocument'>
                                        <button onClick={openModal} className='btn-modal btn-delete'>   
                                        Show Document                                    
                                        {/* <img src={`http://192.168.1.209:8800/image/${user.document}`} alt='Image not available' /> */}</button> 
                                        <Modal 
                                        isOpen = {modalIsOpen}
                                        onRequestClose={closeModal}
                                        contentLabel='Example'>
{/*                                              <h2>Document of {user.name}</h2> shows document of one user only
 */}                                             <div>
                                                <img  src={`http://192.168.1.209:8800/image/${user.document}`} alt='Image not available' />
                                             </div>

                                        </Modal>
                                    </td>
                                    <td className='tdstatus'>
                                        {(!user.verificationStatus) && (
                                                <button className='btn-submit btn-success' onClick={() => verifyUser(user._id)}>Verify user</button>
                                            )
                                        }
                                        {user.verificationStatus && (
                                            <span>Verified</span>
                                        ) }

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <Base title="User Verification">
            

            {successMessage()}
            {errorMessage()}
            {loadingMessage()}
            {showPendingVerifications()}
        </Base>
    )
}

export default UserVerification
