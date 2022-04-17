import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../authentication/helper';
import Map from '../Components/Map';
import Base from '../core/Base';
import { createRide } from "../Ride/helper/rideapicalls";
import { getUserVehicles } from './helper/userapicalls';



const PostRide = () => {

    const [latitude, setLatitude] = useState(19.05444);
    const [longitude, setLongitude] = useState(72.84056)
    const [locationName, setLocationName] = useState('Bandra, Mumbai')
    
    const [values,setValues] = useState({
        sourceLocation: "",
        destinatonLocation: "",
        vehicles: [],
        startLocation:"",
        destLocation:"",
        vehicle:"",
        startTime: "",
        fare: "",
        seats: "",
        error: [],
        success: false,
        loading: false, 
    })
    const {user,token} = isAuthenticated();
    const {
        sourceLocation,
        destinationLocation,
        vehicles,
        vehicle,
        startLocation,
        destLocation,
        startTime,
        fare,
        seats,
        error,
        success,
        loading,
    } = values;
    const  onLocationChange = (lat, lon, name) => {
        setLatitude(lat)
        setLongitude(lon)
        setLocationName(name)
        console.log(`${lat}, ${lon}`)
    }
    const preload = () => {
        if(!user.verificationStatus){
            return setValues({...values, error: [{
                param: "general",
                msg: "Documents need to be verified to post a ride"}]})
        }
        getUserVehicles(user._id, token).then(data => {
            if(data.error) {
                
                    return setValues({...values, error: [{        param: "general", msg: "To post a ride, you must add a vehicle first"}]})
               
            }else{
                    setValues({...values, vehicles: data.vehicles, vehicle: data.vehicles[0]._id})
                    console.log(data.vehicles)
            }
        })

    }

    useEffect(() => {
      preload()
    }, [])

    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, loading: true, error:""})
       
        
        createRide({ sourceLocation, destinationLocation, startTime, vehicle, fare, seats}, user._id, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                setValues({...values, loading: false, success: data.message})
            }
        }).catch(err => {
            console.log("Failed to post the ride")
        })
    }

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
   
    const handleChange = (name) => (event)=>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const setLocation = (name) => {
        const obj = { latitude: latitude, longitude: longitude, name: locationName }
        console.log(obj)
        if(name == "source"){
            setValues({...values, sourceLocation: obj, startLocation: locationName})
        }else{
            console.log('dest')
            setValues({...values, destinationLocation: obj, destLocation: locationName})
        }
    }

    const rideForm = ()=>{
        
        return (
            <div className="form-div-outer postride-outer">
                <div className="form-div-inner postride-inner" >
                    <form>
                        <b style={{'fontSize': "1rem"}}>Find location on map and click on set Location</b>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                    Source <span className="required">*</span> : <input type='text' 
                                    value={startLocation} 
                                    name="sourceLocation"
                                    disabled
                                    onChange={handleChange("startLocation")}/> &nbsp;
                                    <button className="btn-submit" onClick={(e) => { e.preventDefault()
                                setLocation('source')}}>Set Location</button><br/>
                                <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                    if(err.param === "sourceLocation") return err.msg
                                })}</span>  </b>  
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destLocation">

                                Destination <span className="required">*</span>: <input type='text' name='destinationLocation' disabled value={destLocation} onChange={handleChange("destLocation")}/> &nbsp;<button className="btn-submit" onClick={(e) => { e.preventDefault()
                                setLocation('dest')}}>Set Location</button><br/>
                                <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                    if(err.param === "destinationLocation") return err.msg
                                })}</span>  </b>  
                            </label>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="vehicle">
                                Vehicle <span className="required">*</span> : 
                                    <select id='vehicle' name='vehicle' onChange={handleChange("vehicle")}>
                                        {vehicles && vehicles.map((vehicle,key)=>{
                                            return (
                                                <option key={key} value={vehicle._id}>{vehicle.model}</option>
                                            )
                                        })}
                                    </select><br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "vehicle") return err.msg
                                    })}</span>  </b>  
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="seats">
                                Seats <span className="required">*</span> : <input 
                                    type="number" 
                                    name="seats" id="seats" 
                                    onChange={handleChange("seats")}/><br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "seats") return err.msg
                                    })}</span>  </b>  
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fare">
                                Fare <span className="required">*</span> : <input 
                                    type="text" 
                                    name="fare" id="fare" 
                                    onChange={handleChange("fare")}/><br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "fare") return err.msg
                                    })}</span>  </b>  
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">
                            Start Time <span className="required">*</span> : <input 
                                    type="datetime-local" 
                                    name="startTime" id="startTime" 
                                    onChange={handleChange("startTime")}/><br/>
                                    <b><span className="errorMessage" >{error && error.map((err) => {
                                        if(err.param === "startTime") return err.msg
                                    })}</span>  </b>  
                            </label>
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>Post</button>
                    </form>
                </div>
                <Map latitude={latitude} longitude={longitude} onLocationChange={onLocationChange}/>
               
            </div>
        )
    }

    return (
        <Base title='Post Ride'>
            {error && error.map((err) => {
                if (err.param == 'general')
                return( <div className="errorMessage">
                <h2  style={{"fontSize": "1.2rem"}}>{err.msg}</h2>
            </div>)
            })}
            {successMessage()}
            {loadingMessage()}
            {rideForm()}
        </Base>
    )
}
export default PostRide;