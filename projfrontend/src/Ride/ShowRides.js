import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { getAllRides, requestRideCall } from './helper/rideapicalls';
import RideCard from '../Components/RideCard';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"


mapboxgl.accessToken = 'pk.eyJ1IjoidGFudmktbmFpayIsImEiOiJja3Q4cWtlemYxNGoyMndvNzdzeWs5MjB5In0.oH-aTfa41Y2L-MmvZeYz5Q';

const ShowRides = () => {
 

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
      });
      
    const [values, setValues] = useState({
        rides: [],
        error: "",
        loading:false,
        sourceFilter: "",
        filter: {
            latitude: "",
            longitude: "",
            name:""
        },
        currentFilter: "",
        destinationFilter: ""
    })

    const {user, token} = isAuthenticated()

    const {
        error,
        rides,
        filter,
        sourceFilter,
        destinationFilter,
        currentFilter
    } = values

    const setFilterValue = (val) => {
        if (val == "source"){
            setValues({...values, currentFilter: val, sourceFilter: filter.name })
        }else{
            setValues({...values, currentFilter: val, destinationFilter: filter.name})
        }
        
    }
    geocoder.on('result', (event) => {
        console.log(event.result)
        let coordinates = {
            latitude: "",
            longitude: "",
            name: event.result.place_name.split(",")[0]
        }
        setValues({...values, filter: coordinates})

        const place = event.result.place_name.split(",")
    })
    const preload = () => {
        console.log(user._id)
        
        setValues({...values, loading: true})
        getAllRides().then(data => {
            let rides=[]
            data.rides.map(ride => {
                
                if(
                (!ride.passengers.includes(user._id)) &&
                (!ride.requests.includes(user._id)) &&
                ((ride.driverUser._id !== user._id)) && 
                (! (ride.seats <= 0)) 
                ) 
                {
                    rides.push(ride)
                }
            })
            
            setValues({...values, loading:false, rides: rides})
        })
    }

    useEffect(() => {
        preload()
    },[])


    const errorMessage = () =>{
        return(
        <div className="errorMessage" style={{display: error ? "" : "none" }}>
            {error}
        </div>
        )
    }
    
    const requestRide = (e) => {
        const rideId = e.target.parentNode.id

        //backend request-ride call
        requestRideCall(rideId, user._id, token)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                console.log(data.ride)
            }
        }).catch( err => console.log("Requesting ride failed!"))

        // updating UI
        let tempRides = [...rides]
        let newRides = []
        tempRides.map((ride,i) => {
            if(tempRides[i]._id == rideId){
                newRides.push({...tempRides[i], requests: [...tempRides[i].requests, user._id], requestSent:true})
            }
            else{
                newRides.push(tempRides[i])
            }
        })
        console.log(newRides)
        setValues({...values, rides: newRides})
    }

    const showRides = () => {
        return (
            <div  className="ride-card">

                {rides && rides.map((ride, key) => {
                    if( ride.seats > 0){
                        return <RideCard ride={ride} key={key} requestRide = {requestRide}/>
                    }
                })}
            </div>
        )
    }


    return (
        <Base title="Find a ride">
            {errorMessage()}
            <div className='ride-outer'>
            {showRides()}
            </div>
           
        </Base>
    )
}
export default  ShowRides;