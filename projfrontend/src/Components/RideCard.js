import React, { useEffect, useState } from 'react';

const RideCard = (props) => {
    const td = new Date(props.ride.startTime)
    const thours = td.getHours()
    const tmins = td.getMinutes()
    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getTime());
        return [date.getFullYear(), mnth, day].join("-");
      }
    return (
        <div className="ride-card" >
            <div></div>
            <div className="ride" id={props.ride._id}>
                <div className="ride-driver"> <span className='field'>Driver: </span>{props.ride.driverUser.name}</div>

                <div className="ride-locations">
                    <span className="source"><span className="field">From: </span >{props.ride.sourceLocation.name} </span> &nbsp; &nbsp;
                    <span className="destination">  <span className='field'>To: </span>{props.ride.destinationLocation.name} </span>
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
                    {(props.ride.requestSent) && 
                        <button className="btn-submit ride-btn request-sent-btn " disabled>Sent</button>
                    }
                    {(!props.ride.requestSent) && 
                    <button className=" btn-submit ride-btn request-ride" onClick={props.requestRide}>Request</button>
                    }
                    <button className="btn-submit ride-btn" onClick={props.chat}>Chat</button>
                    </>
                )}
                
                
                
            </div>
            <div></div>
        </div>
    )
}

export default RideCard