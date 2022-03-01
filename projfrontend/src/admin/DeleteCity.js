import React from 'react'
import Base from '../core/Base'
import { getAllCities } from '../Ride/helper/rideapicalls'
import { deleteCity } from './helper/adminapicalls'
import { useState , useEffect} from 'react'
import { isAuthenticated } from '../authentication/helper'


const DeleteCity = () => {

    const [values, setValues] = useState({
        cities: "",
        error:"",
        success: "",
        loading: ""
    })

    const {
        cities,
        error,
        loading,
        success
    } = values

    const {token} = isAuthenticated()

    const deletecity = (cityId) =>{
        setValues({...values, loading:true})

        deleteCity( cityId, token).
        then( data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }
            else{
                setValues({
                    ...values,
                    loading: false,
                    success: data.message,
                })
                setTimeout(preload,2000)
            }
        }
        )
    }
    const errorMessage = () =>{
        return(
        <div className="errorMessage" style={{display: error ? "" : "none" }}>
            <h2>{error}</h2>
        </div>
        )
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
    const successMessage = () => {
        if(success){
            return (
                <div className="successMessage">
                    <h2>{success}</h2>
                </div>
            )
        }
    }
    const preload = () => {
        setValues({...values, loading: true})
        getAllCities().then(
            data=> {
                if(data.error){
                    setValues({...values, error: data.error,loading: false})
                }
                else{
                    setValues({
                        ...values,
                        cities: data.cities,
                        loading: false
                    })
                }
            }
        )
    }

    useEffect(()=>{
        preload();
    }, [])

    const showAllCities = () => {
        return (
            <div className="userVerification-outer">
                <table border="1px solid black" className='userVerification-table'>
                    <thead>
                        <tr>
                        <th className='tdname cityname'>Name</th>
                        <th className='tddocument cityLatitude'>Latitude</th>
                        <th className='tdstatus cityLongitude'>Longitude</th>
                        <th className='tddeletebtn'><span></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities && cities.map((city,key)=>{
                            return(
                                <tr key={key}>
                                    <td className='tdname cityname'>{city.name}</td>
                                    <td className='tddocument cityLatitude'>{city.latitude}</td>
                                    <td className='tdstatus cityLongitude'>{city.longitude}</td>
                                    <td><button className="btn-submit btn-delete " onClick={() => deletecity(city._id)}>Delete City</button></td>                               
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <Base title="Delete City" >
            {errorMessage()}
            {loadingMessage()}
            {successMessage()}
            {showAllCities()}
        </Base>
    )
}
export default  DeleteCity