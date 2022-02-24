import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../authentication/helper';

const RideCard = (props) => {
    const {user} = isAuthenticated()
    const td = new Date(props.ride.startTime)
    const thours = td.getHours()
    const tmins = td.getMinutes()


    return (
            <div className="ride" id={props.ride._id}>
                <div className="ride-driver"> <span className='field'>Driver: </span>{props.ride.driverUser.name}</div>

                <div className="ride-locations">
                    <span className="source"><span className="field">From: </span >{props.ride.sourceLocation[0].name} </span> <br></br>
                    <span className="destination">  <span className='field'>To: </span>{props.ride.destinationLocation[0].name} </span>
                </div>

                <div className="ride-seats">
                <span className='field'>Seats: </span>{props.ride.seats}</div>

                <div className="date"><span className='field'>Date: </span> {props.ride.startTime.split('T')[0]}</div>

                <div className="time"> <span className='field'>Time: </span>
                
                {console.log(td)}
                {thours}:{tmins} </div>

                <div className="ride-fare">
               <span className='field'>Fare: </span> {props.ride.fare}</div>
                {(props.showLabels && (
                    <button className="btn-submit ride-btn " onClick={props.viewRide}>view requests</button>
                ))}
                
                {(!props.isList) &&  (
                    <>
                    {(props.ride.requestSent || props.ride.requests.includes(user._id)) ?
                        <button className="btn-submit ride-btn request-sent-btn " disabled>Sent</button>
                    : 
                    <button className=" btn-submit ride-btn request-ride" onClick={props.requestRide}>Request</button>
                    }
                     <Link to={`../messenger/${props.ride.driverUser._id}`}><button className="btn-submit ride-btn" >Chat</button></Link>
                    </>
                )}
                {/* srcLatitude, srcLongitude, dstLatitude, dstLongitude */}
                <Link to={`../viewmap/${props.ride._id}`} ><button className="btn-submit ride-btn ">View Map</button></Link>
                
                
            </div>
            
      
    )
}

export default RideCard