import React, {useEffect, useState} from 'react'
import { BsChevronCompactLeft } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Base from '../core/Base'
import { getRidebyId, getRideInvoices, removePassengerFromRide } from './helper/rideapicalls';

const CheckPayments = () => {
    const [values, setValues] = useState({
        ride: "",
        error: "",
        success: "",
        rideInvoices: "",
        paidPassengers: [],
        pendingPassengers: [],
        currentPassenger: "",
        currentInvoice: ""
    })
    const { ride, error, success, paidPassengers,currentPassenger, pendingPassengers, currentInvoice, rideInvoices } = values
// TODO: check for pending payment passengers too
    const rideId = useParams().rideId
    const preload = () => {
        let ride
        getRidebyId(rideId)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                ride = data.ride
                getRideInvoices(rideId)
                .then(
                    data => {
                        if(data.error){
                            setValues({...values, error: data.error})
                        }else{
                            let paidPassengers = []
                            ride.passengers.map( (passenger, key)=> {
                                data.invoices.filter(invoice => invoice.sender._id == passenger._id).map(item => paidPassengers.push(item.sender._id))
                            })

                            setValues({...values, rideInvoices:data.invoices, ride: ride, paidPassengers:  paidPassengers})
                        }
                    }
                )
            }
        })

        
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
    const removePassenger = (passenger) => {
       
        removePassengerFromRide(ride._id, passenger._id)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, success: "Passenger Removed Successfully"})
                setTimeout(preload,2000)
            }
        })
    }

    useEffect(()=>{
        if(currentPassenger){
           rideInvoices.map((invoice) => {
              if(invoice.sender._id == currentPassenger._id ){
                  setValues({...values, currentInvoice: invoice}) 
              } 
           }) 
        }
    }, [currentPassenger])
   
    useEffect(()=>{
        preload()
    }, [])



    const showPaymentStatus = () => {
        return (
            <div className="rideStatus">
                <table className='userVerification-table'>
                    <tbody>
                        <tr>
                            <th className='tdname'>Passenger</th>
                            <th className='tdstatus'>Status</th>
                            <th className='tddocument'>Invoice</th>
                            <th>Remove Passenger</th>
                        </tr>
                        {ride.passengers && ride.passengers.map((passenger,key) => {
                            return (<tr key={key} >
                                <td className='tdname'>{passenger.name}</td>

                                {/* Checks if the passenger has paid for the ride */}
                                <td>{
                                    paidPassengers.includes(passenger._id) ? <span>Paid</span> : <span>Pending</span>
                                }
                                </td>

                                {/* shows invoice if payment is succesfull */}
                                <td className='tddocument'>
                                {
                                    paidPassengers.includes(passenger._id) ? <button className='btn-submit btn-noboxshadow' onClick={() => {
                                        setValues({...values, currentPassenger: passenger})
                                    }}>Show Payment Details</button> : <span>NA</span>
                                }                                 
                                </td>
                                <td>
                                {
                                    !paidPassengers.includes(passenger._id) ? <button className='btn-submit btn-noboxshadow' onClick={() => removePassenger(passenger)}>Remove Passenger</button> : <span>NA</span>
                                }
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    const showInvoice = () => {
        return (
            <div>
            
            {currentInvoice && (
            <div className="form-div-outer">
                   
                 <div></div>
                <div className="form-div-inner">
                    <form>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Sender:  <input 
                                    type="text" 
                                    disabled
                                    style={{"fontWeight": 800}}
                                    value={currentInvoice.sender.name}
                                   />
                                    
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Receiver:  <input 
                                    type="text" 
                                    disabled
                                    style={{"fontWeight": 800}}
                                    value={currentInvoice.receiver.name}
                                   />
                                    
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Amount: &#8377;   <input 
                                    type="text" 
                                    disabled
                                    style={{"fontWeight": 800}}
                                    value={currentInvoice.invoiceAmount}
                                   />
                                    
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Date:   <input 
                                    type="text" 
                                    disabled
                                    style={{"fontWeight": 800}}
                                    value={currentInvoice.createdAt.split('T')[0]}
                                   />
                                    
                            </label>
                        </div>
                        
                    </form>
                </div>
                <div></div>
            </div>  )} 
            </div>
           
        )
    }

  return (
    <Base title='Check Payments'>
        {successMessage()}
        {errorMessage()}
        {showPaymentStatus()}
        {showInvoice()}
    </Base>
  )
}
export default CheckPayments