import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { createRide, getAllCities, getAllRides } from "../Ride/helper/rideapicalls";
const PostRide = () => {
    const [values,setValues] = useState({
        sourceLocation: "",
        destinatonLocation: "",
        startTime: "",
        fare: "",
        seats: "",
        error: "",
        success: false,
        loading: false, 
        cities: "" 
    })
    const {user,token} = isAuthenticated();
    const {
        sourceLocation,
        destinatonLocation,
        startTime,
        fare,
        seats,
        error,
        success,
        loading,
        cities
    } = values;

    const preload = () => {
        getAllCities().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, cities: data.cities})
            }
        })

    }

    useEffect(() => {
      preload()
    }, [])


    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, loading: true})

        createRide({sourceLocation,destinatonLocation, startTime,fare, seats}, user._id, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                setValues({...values, loading: false, success: true})
            }
        }).catch(err => {
            console.log("Create Ride request failed")
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
    const succesMessage = () => {
        if(success){
            return (
                <div className="succesMessage">
                    <h2>Ride Posted successfully</h2>
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

    const rideForm = ()=>{
        return (
            <div className="form-div-outer">
                 <div></div>
                <div className="form-div-inner">
                    <form>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Source: {/* <input 
                                    type="text" 
                                    name="sourceLocation" id="sourceLocation" 
                                    onChange={handleChange("sourceLocation")}/> */}
                                    <select id='sourceLocation' name='sourceLocation' onChange={handleChange("sourceLocation")}>
                                        {cities && cities.map((city,key)=>{
                                            return (
                                                <option key={key} value={city.name}>{city.name}</option>
                                            )
                                        })}
                                    </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destinatonLocation">
                                Destination: {/* <input 
                                    type="text" 
                                    name="destinatonLocation" id="destinatonLocation" 
                                    onChange={handleChange("destinatonLocation")}/> */}
                                    <select id='destinatonLocation' name='destinatonLocation' onChange={handleChange("destinatonLocation")}>
                                        {cities && cities.map((city,key)=>{
                                            return (
                                                <option key={key} value={city.name}>{city.name}</option>
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
            {succesMessage()}
            {loadingMessage()}
            {errorMessage()}
            {rideForm()}
        </Base>
    )
}
export default PostRide;