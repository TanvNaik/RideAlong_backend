import React , {useState, useEffect}from 'react'
import { Link, Navigate, useLocation, useParams} from 'react-router-dom'
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import {  getUser, getUserFeedbacks, getUserRides } from './helper/userapicalls'

const ViewUserProfile = (props ) => {
    const [values, setValues] = useState({
        rides: [],
        current: "rides", //rides default
        error:"",
        feedbacks: "",
        findUser: ""

    })
    const {current, rides, error,findUser} = values
    const {user, token} = isAuthenticated()
    const viewId = useParams().viewId/*  useLocation().pathname.split("/")[3] */

   /*  var findUser */
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
        let rides = [];
        let feedbacks = [];
        let payments = [];

        getUserFeedbacks (viewId)
        .then(data => {
            if(data.feedbacks) feedbacks = data.feedbacks
            let allvalues = values
                allvalues.feedbacks = data.feedbacks
                setValues({...allvalues})

 /*            setValues({...values, feedbacks: feedbacks}) */
        })

        getUserRides(viewId)
        .then(data =>{
            let allvalues = values
                allvalues.rides = data.rides
                setValues({...allvalues})
        /*     setValues({...values, rides: data.rides}) */
        }).catch(err => console.log("Unable to retrieve rides"))

        //getuserpayments
        setUser()
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
                        <tr>
                        <th className='sourcetd'>Source</th>
                        <th className='destinationtd'>Destination</th>
                        <th  className='timetd'>Time</th>
                        </tr>
                    {rides && rides.map((ride,key) => {
                    return (
                        <tr key={key}>
                            {console.log(ride)}
                            <td>{ride.sourceLocation.name}</td>
                            <td>{ride.destinationLocation.name}</td>
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
 
            {findUser && <div className="form-div-outer admin-dash user-dash">
            <div className='admin-div user-div'>
                    <div className='profile-pic'>{
                        findUser.profile_pic && (
                            <img src={`http://localhost:8800/image/${user.profile_pic}`} />
                        )
                    }{
                        (!findUser.profile_pic && (
                            <img src={`http://localhost:8800/image/default_${user.gender.toLowerCase() }_pp.png`} />
                        ))}
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
                
            </div>}
            {performRedirect()}
        </Base>
    )
}

export default ViewUserProfile
