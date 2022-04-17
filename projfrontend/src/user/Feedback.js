import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../authentication/helper'
import Base from '../core/Base'
import { getRidebyId } from '../Ride/helper/rideapicalls';
import Rate from '../Components/Rate';
import { writeFeedback } from './helper/userapicalls';

const Feedback = () => {
    const [values, setValues] = useState({
        ride: "",
        error: "",
        success: "",
        rideFeedbacks: "",
        currentPassenger: "",
        currentFeedback: ""
    })
    const [rating, setRating] = useState(0)
    const {user,token} = isAuthenticated()
    const { ride, error, success, currentPassenger,  currentFeedback  } = values
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
   
    useEffect(()=>{
        preload()
    }, [])

    const setUserRating = (rating) => {
        setRating(rating)
        console.log(rating)
    }
    const submitFeedback = (e) => {
        e.preventDefault()
        if(currentPassenger._id == user._id ){
            
            setValues({...values, error: "Cannot give feedback to yourself"})
            setTimeout(()=>{
                setValues({...values, error: ""})
                setRating(0)
            },2000)
            
        }else if (currentFeedback == ""){
            setValues({...values, error: "Feedback cannot be empty"})
            setTimeout(()=>{
                setValues({...values, error: ""})
                setRating(0)
            },2000)
        }else{
        const feedback = {
            feedbackText: currentFeedback,
            rating: (rating)
        }
        writeFeedback(user._id, currentPassenger._id, token, feedback)
        .then(data => {
            if(data.error){
                
                setValues({...values, error: data.error})
            }else{
                
                setValues({...values, success: "Feedback saved successfully"})
                setTimeout(()=>{
                    setValues({...values, success: "", currentFeedback: "", currentPassenger: ""})
                    
                },2000)
            }
        })}
    }
    const showAllPassengers = () => {
        return (
            
                <div className="form-div-inner admin-form ">
                    <br/>
                    {ride && (
                        <span>
                            <button className="btn-submit btn-admin" style={{'background': '#fa7477'}} onClick={() => setValues({...values, currentPassenger: ride.driverUser})} >{ride.driverUser.name}</button><br/><br/>
                        </span>
                    )}
                    
                    {ride.passengers && ride.passengers.map((passenger,key) => {
                        return ( 
                        <span key={key}>
                        <button key={key}className="btn-submit btn-admin" onClick={() => setValues({...values, currentPassenger: passenger})} >{passenger.name}</button><br/><br/>
                        </span>)
                    }) }
                    <br/>
                </div>
                
        )
    }
    
    return (
    <Base title='Feebacks'>
        {errorMessage()}
        {successMessage()}
        <div className="form-div-outer admin-dash">
        {showAllPassengers()}
        <div className='admin-div'>
            {currentPassenger && (
                <form>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                For:  <input 
                                    type="text" 
                                    disabled
                                    style={{"fontWeight": 800}}
                                    value={currentPassenger.name}
                                   />
                                    
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Feeback:  <input 
                                    type="text" 
                                    name='feedbackText'
                                    id='feedbackText'
                                    value={currentFeedback}
                                    onChange={(e) => setValues({...values, currentFeedback: e.target.value})}
                                   />
                                    
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                             Rating: &nbsp;                           
                            <Rate disabled={false} rating={rating} setUserRating={setUserRating}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                            <button className='btn-submit btn-noboxshadow' onClick={submitFeedback}>Submit</button>
                                    
                            </label>
                        </div>
                                                
                    </form>
            )}
                    
                  
        </div>
        </div>
    
    
    </Base>
  )
}

export default Feedback