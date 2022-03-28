import React , {useState, useEffect}from 'react'
import { Link, Navigate,  useParams} from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import {  getUser, getUserFeedbacks, getUserPayments, getUserRides } from './helper/userapicalls'

const ViewUserProfile = (props ) => {
    const [values, setValues] = useState({
        feedbacks:[],
        rides: [],
        payments: [],
        current: "feedbacks",
        findUser: ""

    })
    const {current, rides, findUser, feedbacks, payments} = values
    const {user, token} = isAuthenticated()
    const viewId = useParams().viewId

    const handleClick = (name) => (event) =>{
         setValues({...values, current: name})
    } 
    const setUser = () => {
        getUser(viewId, token, user._id)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                let allvalues = values
                allvalues.findUser = data.user
                setValues({...allvalues})
                console.log(data.user)
            }
        })
    }

    const preload = () => {
        setUser()
        let rides = [];
        let feedbacks = [];
        let payments = [];
        getUserFeedbacks(viewId)
        .then(data => {
            if(data.feedbacks) feedbacks = data.feedbacks
            getUserRides(viewId)
            .then(data =>{
                if(data.rides)
                rides = data.rides
                getUserPayments(viewId)
                .then(data => {
                    if(data.payments) payments = data.payments

                    setValues({...values, rides: rides, feedbacks: feedbacks, payments: payments})
                })
            }).catch(err => console.log("Unable to retrieve user data"))

        })
        
    }


    useEffect(() => {
        preload()
    }, [])


    const performRedirect = () =>{
        if(values.redirect){
            return <Navigate to={values.path} />
        }
    }
    const loadFeedbacks = () => {
        if(current === "feedbacks"){
            return (
                <div className="feedbacks">
                   {feedbacks != [] ? (<div className='data'>
                    <table className="rides-table">
                    <tbody>
                        <tr>
                        <th className='sourcetd'>Feedback By</th>
                        <th className='destinationtd' style={{'width': "20%"}}>Rating</th>
                        <th  className='timetd'>Feedback</th>
                        </tr>
                    {feedbacks && feedbacks.map((feedback,key) => {
                    return (
                        <tr key={key}>
                            <td>{feedback.feedbacker.name}</td>
                            <td>
                                {
                                    [...Array(feedback.rating)].map((item, key) => {
                                        return (
                                            <FaStar
                                            key={key}
                                                color={"000"}
                                            />
                                        )
                                    })
                                }
                                
                                </td>
                            <td>{feedback.feedbackText}</td>
                        </tr>
                    )
                })}
                    </tbody>
                </table>
                   </div>) : (<span>No Feedbacks</span>) }
                </div>
            )
        }
    }
    const loadPayments = () => {
        if(current === "payments"){
            return (
                <div className="payments">
                {payments != [] ? (<div className='data'>
                    <table className="rides-table">
                    <tbody>
                        <tr>
                        <th className='sourcetd'>Date</th>
                        <th className='destinationtd' style={{'width': "20%"}}>Amount</th>
                        <th  className='timetd'>Paid to</th>
                        </tr>
                    {payments && payments.map((payment,key) => {
                    return (
                        <tr key={key}>
                            <td>{payment.createdAt.split("T")[0]}</td>
                            <td> &#8377; {payment.invoiceAmount}</td>
                            <td>{payment.receiver.name}</td>
                        </tr>
                    )
                })}
                    </tbody>
                </table>
                   </div>) : (<span>No Payments</span>) }
            </div>
            )
        }
    }


    const loadRides = () =>{
        if(current === "rides"){
                
        return (
            <div className="rides">
                { rides != [] ? (
                    <div className="data">
                    <table className="rides-table">
                        <tbody>
                            <tr>
                            <th className='sourcetd'>Source</th>
                            <th className='destinationtd'>Destination</th>
                            <th  className='timetd'>Time</th>
                            </tr>
                        {rides && rides.map((ride,key) => {
                        return (
                            <tr key={key}>
                                {console.log(ride)}
                                <td>{ride.sourceLocation[0].name}</td>
                                <td>{ride.destinationLocation[0].name}</td>
                                <td>{ride.startTime.split("T")[0]}</td>
                            </tr>
                        )
                    })}
                        </tbody>
                    </table>
                    </div>
                ) : (<span>No Rides yet</span>)}
            </div>
            
        )}
    }



    return (
        <Base title=''>
 
            {findUser && <div className="form-div-outer admin-dash user-dash">
            <div className='admin-div user-div'>
                    <div className='profile-pic'>
                       <img src={`http://localhost:8800/image/${findUser.profile_pic}`} />
                        
                    </div><br/>
                    <div className='user-info'>
                   <div><span className='field'>Name: </span>{findUser.name}</div> 
                   <div><span className='field'>Email: </span>{findUser.email} </div>
                   <div><span className='field'>Username: </span>{findUser.username} </div>
                   <div><span className='field'>Gender: </span>{findUser.gender} </div>
                   <div><span className='field'>Documents: </span>{findUser.verificationStatus && (
                       <span>Verified</span>
                   )}
                   {(!findUser.verificationStatus) && (
                       <span>Not verified</span>
                   )}
                   </div>
                   <div>
                           <Link to={`../messenger/${findUser._id}`} ><button className='btn-submit dash-btn' style={{'width' : '70%','padding': '1%'}}>Chat</button></Link>
                        </div>
                   </div>
                   
                </div>
                <hr />
                <div className="form-div-inner admin-form user-nav">
                    <br/>

                    <button className={current == "rides" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"} id='add-city' onClick={handleClick("rides")}>Rides</button> <br/><br/>

                    <button className={current == "rides" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"} id='delete-city' onClick={handleClick("feedbacks")}>Feedbacks</button> <br/><br/>

                    <button className={current == "rides" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"} id='user-verification' onClick={handleClick("payments")}>Payments</button> 
                    <br />

                </div>
                <div className="display-data">
                {loadRides()}
                {loadFeedbacks()}
                {loadPayments()}
                </div>
                
            </div>}
            {performRedirect()}
        </Base>
    )
}

export default ViewUserProfile
