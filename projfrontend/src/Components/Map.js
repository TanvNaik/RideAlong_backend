import React, { useRef, useEffect, useState, useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"



mapboxgl.accessToken = 'pk.eyJ1IjoidGFudmktbmFpayIsImEiOiJja3Q4cWtlemYxNGoyMndvNzdzeWs5MjB5In0.oH-aTfa41Y2L-MmvZeYz5Q';


const Map = ({latitude, longitude, onLocationChange}) => {

    const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true, // Do not use the default marker style
        placeholder: 'Search for a location', // Placeholder text for the search bar
      });
    
    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: 'map', // Container ID
            style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
            center: [longitude, latitude], // Starting position [lng, lat]
            zoom: 12, // Starting zoom level
          });

    
        // Add the geocoder to the map
        map.addControl(geocoder);
        map.on('load', () => {
        map.addSource('single-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        });
      
        // Listen for the `result` event from the Geocoder
        // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', (event) => {
            console.log(event.result)
            // setLatitude(event.result.geometry.coordinates[1])
            // setLongitude(event.result.geometry.coordinates[0])
            const place = event.result.place_name.split(",")
          
            onLocationChange(event.result.geometry.coordinates[1],event.result.geometry.coordinates[0],  event.result.place_name)
            
          map.getSource('single-point').setData(event.result.geometry);
        });
      });
    },[])
    

  return (
      <div id='map' className='map'>
      </div>
  )
}

export default Map