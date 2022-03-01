import React, {useState} from 'react'
import { isAuthenticated } from '../authentication/helper'
import Base from "../core/Base"
import { addVehicle } from './helper/userapicalls'


const AddVehicle = () => {
    const [values, setValues] = useState({
        namePlate:"",
        model: "",
        numberOfSeats: "",
        license: "",
        vehicleInsurance: "",
        vehicleRC: "",
        success:"",
        loading: "",
        error:"",
        formData: new FormData()
    })


    const {
        namePlate,
        model,
        numberOfSeats,
        license,
        vehicleInsurance,
        vehicleRC,
        success,
        loading,
        error,
        formData
    } = values;

    const {user,token} = isAuthenticated()

    const handleChange = (name) => (event) =>{
        const value = (name === "license" || name === "vehicleInsurance" || name === "vehicleRC")? event.target.files[0] : event.target.value;
        formData.set(name,value)
        setValues({...values, [name]: value})
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setValues({...values, loading: true})
        addVehicle(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{
                setValues({...values, loading:false, success: data.message, error: "" })
            }
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
    const showAddVehicleForm = () => {
        return (
            <div className="form-div-outer">
                <div></div>
                <div className='form-div-inner'>
                    <form >
                        <div className="form-group">
                            <label htmlFor="model">
                                Model:  <input 
                                    type="text" 
                                    required={true}
                                    name="model" id="model" 
                                    onChange={handleChange("model")}/>                                 
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nameplate">
                                Number on nameplate: <input 
                                    type="text" 
                                    required={true}
                                    name="nameplate" id="nameplate" 
                                    onChange={handleChange("nameplate")}/> 
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfSeats">
                                Number of seats (including driver seat): <input 
                                    type="number" 
                                    name="numberOfSeats" 
                                    required={true}
                                    id="numberOfSeats" 
                                    onChange={handleChange("numberOfSeats")}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="license">License: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="license"
                                id='license'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("license")}
                            />         
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicleInsurance">Vehicle Insurance: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="vehicleInsurance"
                                id='vehicleInsurance'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("vehicleInsurance")}
                            />         
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicleRC">Vehcile RC: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="vehicleRC"
                                id='vehicleRC'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("vehicleRC")}
                            />         
                        </div>
                        <button className="btn-submit" onClick={onSubmit}>Add</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Register Vehicle">
            {successMessage()}
            {errorMessage()}
            {loadingMessage()}
            {showAddVehicleForm()}
        </Base>
    )
}

export default AddVehicle