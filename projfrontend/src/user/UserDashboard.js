import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import { FaStar } from "react-icons/fa";
import {  getUserFeedbacks, getUserPayments, getUserRides } from './helper/userapicalls'


const UserDashboard = () => {

    const [values, setValues] = useState({
        feedbacks:[],
        rides: [],
        payments: [],
        current: "feedbacks" //rides default
    })
    const {current, rides, feedbacks, payments} = values
    const {user} = isAuthenticated()

    const handleClick = (name) => (event) =>{
         setValues({...values, current: name})
    } 

    const preload = () => {
        let rides = [];
        let feedbacks = [];
        let payments = [];
        

        getUserFeedbacks(user._id)
        .then(data => {
            if(data.feedbacks) feedbacks = data.feedbacks
            getUserRides(user._id)
            .then(data =>{
                if(data.rides){
                    rides = data.rides.map(ride => {
                        if(!ride.requests.filter( req => req ==user._id)){
                            return ride
                        }
                    })
                }
                rides = data.rides
                getUserPayments(user._id)
                .then(data => {
                    if(data.payments) payments = data.payments

                    setValues({...values, rides: rides, feedbacks: feedbacks, payments: payments})
                })
            }).catch(err => console.log(err))

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
                                { feedback.rating == 0 ? (<FaStar
                                            key={key}
                                                color={"000"}
                                            />):
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
                   </div>) : (<span>No Feedbacks</span>) }
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
            <div className="form-div-outer admin-dash user-dash">
            <div className='admin-div user-div'>
                    <div className='profile-pic'>
                            <img src={`http://localhost:8800/image/${user.profile_pic}`} />
                    </div>
                    <div className='user-info'>
                   <div><span className='field'>Name: </span>{user.name}</div> 
                   <div><span className='field'>Email: </span>{user.email} </div>
                   <div><span className='field'>Username: </span>{user.username} </div>
                   <div><span className='field'>Gender: </span>{user.gender} </div>
                   <div><span className='field'>Documents: </span>{user.verificationStatus && (
                       <span style={{color:'green', fontWeight: 500}}>Verified</span>
                   )}
                   {(!user.verificationStatus) && (
                       <span style={{color:'red', fontWeight: 500}}>Not verified</span>
                   )}
                   </div>
                   <div>
                           <Link to={"../update-profile"} ><button className='btn-submit dash-btn' style={{'width' : '70%','padding': '1%'}}>Update Profile</button></Link>
                        </div>
                      
                  
                   </div>
                   <div className='vehicle-btn ud-third-section'>
                       <div>
                           <Link to={"../add-vehicle"}><button className='btn-submit dash-btn'>Register Vehicle</button></Link>
                           </div>
                       <div>
                           <Link to={"../post-ride"}><button className='btn-submit dash-btn'>Post Ride</button></Link>
                       </div>
                       <div>
                           <Link to={"../get-rides"}><button className='btn-submit dash-btn'>Find Ride</button></Link>
                       </div>
                       <div>
                           <Link to={"../show-ride-requests"}><button className='btn-submit dash-btn'>Ride requests </button></Link>
                       </div>
                       <div>
                           <Link to={"../check-request-status"}><button className='btn-submit dash-btn'>Check Ride status</button></Link>
                       </div>
                   </div>
                </div>
                
                <div className="form-div-inner admin-form user-nav">
                    <br/>

                    <button  className={current == "rides" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"} id='add-city' onClick={handleClick("rides")}>Rides</button> <br/><br/>

                    <button className={current == "feedbacks" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"} id='delete-city' onClick={handleClick("feedbacks")}>Feedbacks</button> <br/><br/>

                    <button className={current == "payments" ? "btn-submit btn-admin btn-user active" : "btn-submit btn-admin btn-user"}id='user-verification' onClick={handleClick("payments")}>Payments</button> 

                    <br />
                </div>
                <div className="display-data">
                {loadRides()}
                {loadFeedbacks()}
                {loadPayments()}
                </div>
                
            </div>
            {performRedirect()}
        </Base>
    )
}

export default UserDashboard