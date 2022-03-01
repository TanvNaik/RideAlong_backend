import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../authentication/helper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { createInvoice } from '../Ride/helper/rideapicalls'

const StripeCheckout = ({ride, fare}) =>  {
    const [values, setValues] = useState({
        loading: false,
        success: false,
        error: "",
        paymentStatus: "",
        ride: ""
    })
    const {
        loading,
        success,
        error,
        paymentStatus
    } = values
    const {user, token} = isAuthenticated()

    const userId =user._id

    const makePayment = (token) => {
        const body = {
            token,
            fare,
            email: user.email
        }
        const headers = {
            'Content-Type': "application/json"
        }
        return fetch(`/api/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then( response =>{
            const {status} = response
            if(status === 200){
                let body = {
                    sender: userId,
                    receiver: ride.driverUser._id,
                    ride: ride._id,
                    invoiceAmount: fare
                }
                createInvoice(body, userId, ride._id, isAuthenticated().token).then(data => {
                    if(data.error){
                        setValues({...values, error: data.error})
                    }
                    else{
                        console.log(data)
                        setValues({...values, paymentStatus: status})
                    }
                })
            }
           

        }).catch(err => console.log(err))
        
    }
    const showStripeButton = () => {
        return (
            <StripeCheckoutButton
                stripeKey= {process.env.REACT_APP_STRIPE_KEY}
                token={makePayment}
                amount= {fare * 100}
                name='Pay for Ride'
            >
                <button className='btn-submit'>Pay with stripe</button>
            </StripeCheckoutButton>)
        
        
    }
    

    return (
        <div>
            {(paymentStatus === 200) && 
                    (
                        <div className='payment-success' >Payment Successfull</div>
                    )
                }
            {(paymentStatus !== 200) &&(
                        <div>
                            {showStripeButton()}
                        </div>
                    )
            }
            
        </div>
    )
}

export default StripeCheckout
