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
        error:[],
        formData: new FormData()
    })


    const {
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
 
    const showAddVehicleForm = () => {
        return (
            <div className="form-div-outer">
                <div></div>
                <div className='form-div-inner'>
                    <form >
                        <div className="form-group">
                            <label htmlFor="model">
                                Model <span className="required">*</span>:  <input 
                                    type="text" 
                                    required={true}
                                    name="model" id="model" 
                                    onChange={handleChange("model")}/>       <br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "model") return err.msg
                                    })}</span>  </b>                        
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="namePlate">
                                Number on nameplate <span className="required">*</span>: <input 
                                    type="text" 
                                    required={true}
                                    name="namePlate" id="namePlate" 
                                    onChange={handleChange("namePlate")}/>
                                           <br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "namePlate") return err.msg
                                    })}</span>  </b>  
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="numberOfSeats">
                                Number of seats (including driver seat) <span className="required">*</span>: <input 
                                    type="number" 
                                    name="numberOfSeats" 
                                    required={true}
                                    id="numberOfSeats" 
                                    onChange={handleChange("numberOfSeats")}/>
                                           <br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "numberOfSeats") return err.msg
                                    })}</span>  </b> 
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="license">License <span className="required">*</span>: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="license"
                                id='license'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("license")}
                            />         
                                   <br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "license") return err.msg
                                    })}</span>  </b> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicleInsurance">Vehicle Insurance <span className="required">*</span>: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="vehicleInsurance"
                                id='vehicleInsurance'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("vehicleInsurance")}
                            />         
                            <br/>
                            {console.log(error)}
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "vehicleInsurance") return err.msg
                                    })}</span>  </b> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicleRC">Vehcile RC <span className="required">*</span>: </label>
                            <input
                            style={{border: "none", boxShadow:"none"}}
                                type="file"
                                name="vehicleRC"
                                id='vehicleRC'
                                required={true}
                                accept='image/*'
                                onChange={handleChange("vehicleRC")}
                            />         
                            <br/>
                                    <b><span className="errorMessage" style={{'fontSize': "0.8rem"}}>{error && error.map((err) => {
                                        if(err.param === "vehicleRC") return err.msg
                                    })}</span>  </b> 
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
            {error && error.map((err) => {
                if (err.param == 'general')
                return( <div className="errorMessage">
                <h2  style={{"fontSize": "1.2rem"}}>{err.msg}</h2>
            </div>)
            })}
            {loadingMessage()}
            {showAddVehicleForm()}
        </Base>
    )
}

export default AddVehicle