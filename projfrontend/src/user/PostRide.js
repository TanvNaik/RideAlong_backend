import React, {useState, useEffect} from 'react'

import { isAuthenticated } from '../authentication/helper';
import Map from '../Components/Map';
import Base from '../core/Base';
import { createRide, getAllCities } from "../Ride/helper/rideapicalls";
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
        error: "",
        success: false,
        loading: false, 
        cities: []
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
        cities
    } = values;
    const  onLocationChange = (lat, lon, name) => {
        setLatitude(lat)
        setLongitude(lon)
        setLocationName(name)
        console.log(`${lat}, ${lon}`)
    }
    const preload = () => {
        if(!user.verificationStatus){
            return setValues({...values, error: "Documents need to be verified to post a ride"})
        }
        getUserVehicles(user._id, token).then(data => {
            if(data.error) {
                setValues({...values, error: "To post a ride, you must add a vehicle first"})
               
            }else{
                    setValues({...values, vehicles: data.vehicles, vehicle: data.vehicles[0]._id})
            }
        })

    }

    useEffect(() => {
      preload()
    }, [])

    
    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, loading: true, error:""})
        console.log(destinationLocation)

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
    const errorMessage = () =>{
        if(error){
            return (
                <div className="errorMessage">
                    <h2>{error}</h2>
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
                                    Source: <input type='text' 
                                    value={startLocation} 
                                    disabled
                                    onChange={handleChange("startLocation")}/> &nbsp;
                                    <button className="btn-submit" onClick={(e) => { e.preventDefault()
                                setLocation('source')}}>Set Location</button>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">

                                Destination: <input type='text' disabled value={destLocation} onChange={handleChange("destLocation")}/> &nbsp;<button className="btn-submit" onClick={(e) => { e.preventDefault()
                                setLocation('dest')}}>Set Location</button>
                            </label>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="vehicle">
                                Vehicle: 
                                    <select id='vehicle' name='vehicle' onChange={handleChange("vehicle")}>
                                        {vehicles && vehicles.map((vehicle,key)=>{
                                            return (
                                                <option key={key} value={vehicle._id}>{vehicle.model}</option>
                                            )
                                        })}
                                    </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="seats">
                                Seats: <input 
                                    type="number" 
                                    name="seats" id="seats" 
                                    onChange={handleChange("seats")}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fare">
                                Fare: <input 
                                    type="text" 
                                    name="fare" id="fare" 
                                    onChange={handleChange("fare")}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">
                            Start Time: <input 
                                    type="datetime-local" 
                                    name="startTime" id="startTime" 
                                    onChange={handleChange("startTime")}/>
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
            {successMessage()}
            {loadingMessage()}
            {errorMessage()}
            {rideForm()}
        </Base>
    )
}
export default PostRide;