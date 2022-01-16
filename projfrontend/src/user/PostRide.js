import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { createRide, getAllCities, getAllRides } from "../Ride/helper/rideapicalls";
import { getUserVehicles } from './helper/userapicalls';
const PostRide = () => {
    const [values,setValues] = useState({
        sourceLocation: "",
        destinatonLocation: "",
        vehicles: [],
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
        startTime,
        fare,
        seats,
        error,
        success,
        loading,
        cities
    } = values;

    const preload = () => {
        let cities=[]
        getAllCities().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                cities = data.cities

            }
        })

        
        getUserVehicles(user._id, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            }else{
                setValues({...values, vehicles: data.vehicles, cities: cities, vehicle: data.vehicles[0]._id, sourceLocation: cities[0]._id, destinationLocation: cities[0]._id})
            }
        })

    }

    useEffect(() => {
      preload()
    }, [])


    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, loading: true})

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
        console.log(event.target.value)
        setValues({...values, error:false, [name]: event.target.value})
    }

    const rideForm = ()=>{
        return (
            <div className="form-div-outer">
                 <div></div>
                <div className="form-div-inner">
                    <form>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Source: 
                                    <select id='sourceLocation' name='sourceLocation' onChange={handleChange("sourceLocation")}>
                                        {cities && cities.map((city,key)=>{
                                            return (
                                                <option key={key} value={city._id}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destinationLocation">
                                Destination: 
                                    <select id='destinationLocation' name='destinationLocation' onChange={handleChange("destinationLocation")}>
                                        {cities && cities.map((city,key)=>{
                                            return (
                                                <option key={key} value={city._id}>{city.name}</option>
                                            )
                                        })}
                                    </select>
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
                <div></div>
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