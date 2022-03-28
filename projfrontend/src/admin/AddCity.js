import React, { useState } from 'react'
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { addCity } from './helper/adminapicalls';
/* D O N E */

const AddCity = () => {

    const [values, setValues] = useState({
        success: false,
        error: "",
        loading: false,
        cityName: "",
        cityLatitude: "",
        cityLongitude:""
    })

    const {success, error, loading, cityLatitude, cityName, cityLongitude} = values;
    const {token, user} = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({...values,error: false,[name]: event.target.value })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        setValues({...values, loading: true})

        addCity(user._id, token, {cityName, cityLatitude, cityLongitude})
        .then(data => {
            console.log(data)
            if(data.error){
                setValues({...values, error: data.error, loading: false});
            }else{
                setValues({...values, success: true, loading: false})
            }
        })
        .catch(err => console.log("AddCity request failed!"))  
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
                    <h2>City Added Succesfully</h2>
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
    const addCityForm = ()=>{
        return (
            <div className="form-div-outer">
                <div></div>
                <div className="form-div-inner">
                    <form>
                        <div className="form-group">
                           <label htmlFor="cityName">City Name: </label>
                           <input type="text" id='cityName' onChange={handleChange("cityName")} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude: </label>
                            <input type="text" id="longitude" onChange={handleChange("cityLongitude")}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude: </label>
                            <input type="text" id="latitude" onChange={handleChange("cityLatitude")} />
                        </div>
                        <button className='btn-submit' onClick={onSubmit}>Add City</button>
                    </form>
                </div>
                <div></div>
            </div>
        )
    }
    return (
        <Base title="Add City">
            {loadingMessage()}
            {successMessage()}
            {errorMessage()}
            {addCityForm()}            
        </Base>
    )
}

export default AddCity;