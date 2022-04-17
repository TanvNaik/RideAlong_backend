import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { getUserRides } from '../user/helper/userapicalls';
import { approveRideRequest, rejectRideRequest } from './helper/rideapicalls';
import RideCard from '../Components/RideCard';

const ShowRideRequests = ()=> {
    const [values, setValues] = useState({
        rides: "",
        loading: "",
        error: "",
        success:"",
        currentRide: ""
    })
    const {
        rides, loading, error, currentRide, success
    } = values
    const {user, token} = isAuthenticated()


    
    const preload = () => {
        getUserRides(user._id).then( data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
                const userrides = data.rides.filter(ride => ride.driverUser._id === user._id)
            
                setValues({...values, rides: userrides})
            }
        })
    }
    const viewRide = (e) => {
        const rideId = e.target.parentNode.id
        console.log(rideId)
        console.log(rides)

        setValues({...values, currentRide: rideId})
    }

    const approveRequest = (e) => {
        const rideId = e.target.parentNode.parentNode.id
        const acceptId = e.target.id
        console.log("rideId: ", rideId)
        console.log("acceptId: ", acceptId)
        approveRideRequest(user._id, rideId, acceptId,token)
        .then(data => {
            if( data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, success: "Request accepted successfully"})

                setTimeout(preload,2000)
            }
        })
    }
    const rejectRequest = (e) => {
        const rideId = e.target.parentNode.parentNode.id
        const rejectId = e.target.id
        rejectRideRequest(user._id, rideId, rejectId, token)
        .then(data => {
            if( data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, success: "Request rejected successfully"})

                setTimeout(preload,2000)
            }
        })
    }

    useEffect(()=>{
        preload()
    }, [])
    const loadingMessage = () =>{
        if(loading){
            return (
                <div className="loadingMessage">
                    <h2>Loading...</h2>
                </div>
            )
        }
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
    const errorMessage = () =>{
        if(error){
            return (
                <div className="errorMessage">
                    <h2>{error}</h2>
                </div>
            )
        }
    }
   
    const showRideRequests = () =>{
        return (
            <div className="form-div-outer admin-dash req-dash">
            <div className="form-div-inner admin-form ride-card">
                 {/* Display ride list */}
                 {rides && rides.map((ride,key) =>{
                    return <RideCard ride={ride} key={key} isList = {true} showLabels={ true } viewRide ={viewRide}/>
                })}
            </div>
            <div className='admin-div'>
                {/* Display the selected ride */}
                {currentRide && rides.map((ride, key) => {
                    if(currentRide === ride._id){
                        if(ride.requests){
                            return (
                                <table key={key} style={{border: "none"}} className="request-table">
                                    <tbody>
                                        <tr>
                                        <th>Name</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                        </tr>
                                        
                                {

                                    ride.requests.map((req,key) =>{
                                        return (
                                            <tr key={key} id= {ride._id}>
                                               
                                            <td>
                                                <Link to={`../view-profile/${req._id}`} style={{'color': 'black'}} >{req.name}</Link> 
                                            </td>
                                            <td className=' ride-req-btn'>
                                                <button className='btn-submit' style={{'textAlign': "center"}} id={req._id} onClick={approveRequest}>Approve</button>

                                            </td>
                                            <td className=' ride-req-btn'><button className='btn-submit' id={req._id} onClick={rejectRequest}>Reject</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                    </tbody>
                               
                                </table>
                            )
                        }
                    }
                })}
                
            </div>
        </div>
        )
    }

  return <Base title='Ride requests'>
      {successMessage()}
      {errorMessage()}
      {loadingMessage()}
      {showRideRequests()}
  </Base>
}

export default ShowRideRequests