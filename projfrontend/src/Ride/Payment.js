import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Base from '../core/Base';
import StripeCheckout from '../core/StripeCheckout';
import { getRidebyId } from './helper/rideapicalls';

const Payment = () => {
    const [values, setValues] = useState({
        ride: "",
        error: "",
        success: ""
    })
    const { ride } = values
    const rideId = useParams().rideId
    const preload = () => {
        getRidebyId(rideId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, ride: data.ride})

            }
        })
    }
    useEffect(()=>{
        preload()       
    }, [])

    const showInvoice = () => {
        return (
            <div className="form-div-outer">
                <div></div>
                <div className="form-div-inner">
                    <div className="form-group">
                        <label htmlFor="from" className='field'>
                         Source:   
                        </label> {ride.sourceLocation[0].name}
                    </div>
                    <div className="form-group">
                        <label htmlFor="from" className='field'>
                         Destination:   
                        </label> {ride.destinationLocation[0].name}
                    </div>
                    <div className="form-group" >
                        <label htmlFor="from" className='field'>
                         Driver:   
                        </label> {ride.driverUser.name}
                    </div>
                    <div className="form-group">
                        <label htmlFor="from" className='field'>
                         Fare:   
                        </label> &#8377;{ride.fare}
                    </div>
                    {/* Stripe Button */}
                    <StripeCheckout
                        ride = {ride}
                        fare = {ride.fare}
                        
                     />
                    
                </div>
                <div></div>
            </div>
        )
    }
  return (
    <Base title=''>
        {ride && showInvoice()}
      
  </Base>);
}
export default Payment