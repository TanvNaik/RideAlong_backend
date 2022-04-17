import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { getUserRides } from './helper/userapicalls';
import { VscChromeClose, VscCheck } from "react-icons/vsc";

const CheckRideStatus = () => {
    const {user} = isAuthenticated()
    const [values, setValues] = useState({
        userRidesAll: [],
        error: "",
        success: "",
        loading: "",
        pendingRides: []
    })

    const {
        pendingRides
    } = values

    const preload = () => {
        const setPendingRides = (rides) => {
            var pendingR = []
            rides.map((ride) => {
                if (ride.driverUser._id == user._id){
                    pendingR.push({ride:ride, driver:true, request:false, passengers:false, payments: false})
                }
                else if(ride.requests.includes(user._id)){
                    pendingR.push({ride: ride,  requests: true, driver:false, payments: false, passengers: false })
                }
                else if(ride.passengers.includes(user._id)){
                    if(ride.payments.includes(user._id)){
                        pendingR.push({ride: ride, requests: false, driver:false,  passengers: true, payments: true })
                    }else{
                        pendingR.push({ride: ride,  requests: false, driver:false, passengers: true, payments: false})
                    }
                }
            }) 
            setValues({...values, pendingRides: pendingR})           
        }

        getUserRides(user._id)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }
            else{
               setPendingRides(data.rides)
            }
        }).catch(err => console.log(err))

        
    }

    useEffect(()=>{
        preload()
    }, [] )

    
  
    const showStatus = () => {
        return (
            <div className="rideStatus">
                <table className='userVerification-table'>
                    <tbody>
                        <tr>
                            <th className='tdname'>Ride</th>
                            <th className='tdstatus'>Own Ride</th>
                            <th className='tddocument'>Request Status</th>
                            <th className='tdstatus'>Payment Status</th>
                            <th className=''>Feedback</th>
                        </tr>
                        {pendingRides && pendingRides.map((ride,key) => {
                            return (<tr key={key} id={ride.ride._id}>
                              
                                <td className='tdname'>{ride.ride.sourceLocation[0].name} <span className="field"><b>to</b></span> {ride.ride.destinationLocation[0].name}</td>

                                {/* Checks if the ride is owned by the current user */}
                                <td>{ride.driver == true ? (<VscCheck color='green' fontSize={"2rem"}/>): (<VscChromeClose color='red' fontSize={"2rem"}/>)}</td>

                                {/* Checks for request status in case user has requested for a ride */}
                                <td className='tddocument'>
                                    {
                                        ride.requests ? (<span>Pending</span>):
                                            (ride.driver ? <span>NA</span> :
                                                <span>Approved</span> )
                                    }                                    
                                    
                                </td>

                                {/* Provides payment form for passengers */}
                                {/* Driver can check the payments recieved for this particular ride */}
                                <td  className='tdstatus'>
                                    {
                                        ride.requests ? (<span>NA</span>) : ride.driver ? (<Link to={`../checkpayments/${ride.ride._id}`}><button className='btn-submit btn-noboxshadow'>Check Payments</button></Link>) : (
                                            ride.payments ? (<span>Paid</span>) : (<Link to={`../payment/${ride.ride._id}`}><button className='btn-submit btn-noboxshadow' id={ride.ride._id} >Pay Now</button></Link>)
                                        )
                                    }
                                    
                                </td>
                                <td>{
                                        ride.requests ? (<span>NA</span>) : ride.driver || ride.payments ? (<Link to={`../feedback/${ride.ride._id}`}><button className='btn-submit btn-noboxshadow' id={ride.ride._id} >Feedback</button></Link>) :(<span>NA</span>) 
                                    } </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

  return (
      <Base title=''>
          {showStatus()}
      {console.log(pendingRides)}
      </Base>
  );
}
export default CheckRideStatus