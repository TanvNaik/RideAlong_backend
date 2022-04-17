import React, { useState } from 'react'
import { isAuthenticated } from '../authentication/helper'
import StripeCheckoutButton from 'react-stripe-checkout'
import { createInvoice } from '../Ride/helper/rideapicalls'

const StripeCheckout = ({ride, fare}) =>  {
    const [values, setValues] = useState({
        loading: false,
        error: "",
        paymentStatus: "",
        ride: ""
    })
    const {
        paymentStatus, loading
    } = values
    const {user} = isAuthenticated()

    const userId =user._id

    const makePayment = (token) => {
        setValues({...values, loading: true})
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
                        setValues({...values, error: data.error, loading:false})
                    }
                    else{
                        console.log(data)
                        setValues({...values, paymentStatus: status, loading:false})
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
    const loadingMessage = ()=>{
        return(
            loading && (
                <div className="loadingMessage">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    return (
        <div>
            {loadingMessage()}
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
