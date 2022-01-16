import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import { getCityNames, getUserFeedbacks, getUserRides } from './helper/userapicalls'


const UserDashboard = () => {

    const [values, setValues] = useState({

        rides: [],
        current: "feedbacks", //rides default

    })
    const {current, rides} = values
    const {user, token} = isAuthenticated()

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


            setValues({...values, feedbacks: feedbacks})
        })

        getUserRides(user._id)
        .then(data =>{
            if(data.rides){
            let tempRides = data.rides

            tempRides.map((ride) => {
                getCityNames(ride.sourceLocation,ride.destinationLocation)
                .then(data => {
                    console.log(data.destinationName)
                    rides.push({
                        sourceLocation: data.sourceName,
                        destinationLocation: data.destinationName,
                         startTime: ride.startTime
                    })
                })
            })
            setValues({...values, rides: rides})
        }

        }).catch(err => console.log("Unable to retrieve rides"))

        //getuserpayments
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
                    No feedbacks availabe
                </div>
            )
        }
    }
    const loadPayments = () => {
        if(current === "payments"){
            return (
                <div className="payments">
                    No payments availabe
                </div>
            )
        }
    }

    const loadRides = () =>{
        if(current === "rides"){
                
        return (
            <div className="data">
                <table className="rides-table">
                    <tbody>
                        <td className='sourcetd'>Source</td>
                        <td className='destinationtd'>Destination</td>
                        <td  className='timetd'>Time</td>
                    {rides && rides.map((ride,key) => {
                    return (
                        <tr key={key}>
                            {console.log(ride)}
                            <td>{ride.sourceLocation}</td>
                            <td>{ride.destinationLocation}</td>
                            <td>{ride.startTime.split("T")[0]}</td>
                        </tr>
                    )
                })}
                    </tbody>
                </table>
            </div>
        )}
    }


    return (
        <Base title=''>
            <div className="form-div-outer admin-dash user-dash">
            <div className='admin-div user-div'>
                    <div className='profile-pic'>{
                        user.profile_pic && (
                            <img src={`http://192.168.1.209:8800/image/${user.profile_pic}`} />
                        )
                    }{
                        (!user.profile_pic && (
                            <img src={`http://192.168.1.209:8800/image/default_${user.gender.toLowerCase() }_pp.png`} />
                        ))}
                    </div><br/>
                    <div className='user-info'>
                   <div><span className='field'>Name: </span>{user.name}</div> 
                   <div><span className='field'>Email: </span>{user.email} </div>
                   <div><span className='field'>Username: </span>{user.username} </div>
                   <div><span className='field'>Gender: </span>{user.gender} </div>
                   <div><span className='field'>Documents: </span>{user.verificationStatus && (
                       <span>Verified</span>
                   )}
                   {(!user.verificationStatus) && (
                       <span>Not verified</span>
                   )}
                   </div>
                  
                   </div>
                   <div className='vehicle-btn'>
                       <div>
                           <Link to={"../add-vehicle"}><button className='btn-submit dash-btn'>Add Vehicle</button></Link>
                           </div>
                       <div>
                           <Link to={"../post-ride"}><button className='btn-submit dash-btn'>Post Ride</button></Link>
                       </div>
                       <div>
                           <Link to={"../get-rides"}><button className='btn-submit dash-btn'>Find Ride</button></Link>
                       </div>
                   </div>
                </div>
                <hr />
                <div className="form-div-inner admin-form user-nav">
                    <br/>
                    <button className="btn-submit btn-admin btn-user" id='add-city' onClick={handleClick("rides")}>Rides</button> <br/><br/>
                    <button className="btn-submit btn-admin btn-user" id='delete-city' onClick={handleClick("feedbacks")}>Feedbacks</button> <br/><br/>
                    <button className="btn-submit btn-admin btn-user" id='user-verification' onClick={handleClick("payments")}>Payments</button> 
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