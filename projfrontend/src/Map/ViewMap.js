import React, {  useEffect, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useParams } from 'react-router-dom';
import { getRidebyId, requestRideCall } from '../Ride/helper/rideapicalls';
import Base from '../core/Base';
import { isAuthenticated } from '../authentication/helper';


mapboxgl.accessToken = 'pk.eyJ1IjoidGFudmktbmFpayIsImEiOiJja3Q4cWtlemYxNGoyMndvNzdzeWs5MjB5In0.oH-aTfa41Y2L-MmvZeYz5Q';


const ViewMap = () => {
  const [ride, setRide] = useState("")
  const [thours, setThours] = useState("")
  const [tmins, setTmins] = useState("")
  const [request, setRequest] = useState(false)


  const rideId = useParams().rideId
  const {user, token} = isAuthenticated()
  const preload = () => {
    getRidebyId(rideId)
        .then(data => {
            if(data.ride){
              setRide(data.ride)              
            }
          })
  }

  useEffect(()=>{
    preload()
  },[])

  useEffect(()=>{
    if(ride){
      showMap()
      console.log(ride.startTime)
      const td = new Date(ride.startTime)
      setThours(td.getHours())
      setTmins(td.getMinutes())
    }
  },[ride])

  const requestRide = (e) => {

    //backend request-ride call
    requestRideCall(ride._id, user._id, token)
    .then(data => {
        setRequest(true)
    }).catch( err => console.log("Requesting ride failed!"))    
  }


    const showMap = () => {
      const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
        center: [ride.sourceLocation[0].longitude, ride.sourceLocation[0].latitude], // Starting position [lng, lat]
        zoom: 12, // Starting zoom level
      });
    const marker = new mapboxgl.Marker({color:"blue"}) // initialize a new marker
        .setLngLat([ride.sourceLocation[0].longitude, ride.sourceLocation[0].latitude]) // Marker [lng, lat] coordinates
        .addTo(map); // Add the marker to the map
      const marker2 = new mapboxgl.Marker({color:"red"}) // initialize a new marker
        .setLngLat([ride.destinationLocation[0].longitude, ride.destinationLocation[0].latitude]) // Marker [lng, lat] coordinates
        .addTo(map);
     map.on('load', () => {
    map.addSource('route', {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
      'type': 'LineString',
      'coordinates': [
      [ride.sourceLocation[0].longitude, ride.sourceLocation[0].latitude],
      [ride.destinationLocation[0].longitude, ride.destinationLocation[0].latitude],
      ]
      }
      }
      });
      map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#888',
      'line-width': 8
      }
      });
  });
    }
   
  

  return (
    <Base title='Ride details'>
      {ride && (<div className="form-div-outer postride-outer">

        <div className="form-div-inner postride-inner" >
        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                    Source: <input type='text' 
                                    value={ride.sourceLocation[0].name} 
                                    disabled
                                    />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sourceLocation">
                                Destination: <input type='text' disabled value={ride.destinationLocation[0].name} /> 
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="seats">
                                Seats: <input 
                                    type="number" 
                                    name="seats" disabled id="seats" 
                                    value={ride.seats}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="vehicle">
                                Vehicle Model: <input 
                                    type="text" 
                                    name="vehicle" disabled id="vehicle" 
                                    value={ride.vehicle.model}/>
                            </label>
                        </div>
                        {console.log(ride.vehicle.model)}
                        <div className="form-group">
                            <label htmlFor="namplate">
                                Nameplate: <input 
                                    type="text" 
                                    name="namplate" disabled id="namePlate" 
                                    value={ride.vehicle.namePlate}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fare">
                                Fare: <input 
                                    type="text" 
                                    name="fare" disabled id="fare" 
                                    value={ride.fare}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fare">
                                Date: <input 
                                    type="text" 
                                    name="fare" disabled id="fare" 
                                    value={ride.startTime.split('T')[0]}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fare">
                                Time: <input 
                                    type="text" 
                                    name="fare" disabled id="fare" 
                                    value={`${thours}:${tmins}`} />
                            </label>
                        </div>  
                        {request ? <button className="btn-submit ride-btn request-sent-btn " disabled>Sent</button> : <button className=" btn-submit ride-btn request-ride" onClick={requestRide}>Request Ride</button>}                 
                    
        </div>
      
        <div id='map' className='map' style={{'width': '80%'}}></div>
        
      </div>)}
    </Base>
  )
}

export default ViewMap