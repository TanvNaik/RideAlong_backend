import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../authentication/helper';
import Base from '../core/Base';
import { getAllRides, requestRideCall } from './helper/rideapicalls';
import RideCard from '../Components/RideCard';


const ShowRides = () => {

    const [values, setValues] = useState({
        rides: [],
        error: "",
        loading:false,
        filter: {
            source: "Mumbai",
            destination: "Delhi"
        }
    })

    const {user, token} = isAuthenticated()

    const {
        error,
        rides,
        loading,
        filter
    } = values

    const preload = () => {
       
        setValues({...values, loading: true})
        getAllRides().then(data => {
            let rides=[]
            let today = new Date()
            data.rides.map(ride => {
                let rideDate =  ride.startTime.split('T')[0]
                let rideTime =ride.startTime.split('T')[1].split('.')[0]
                let todayDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
                let todayTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()


                if(
                (!ride.passengers.includes(user._id)) &&
                (!ride.requests.includes(user._id)) &&
                (! (ride.driverUser._id == user._id)) && 
                (! (ride.passengers.length == ride.seats)) &&
                ( (rideDate < todayDate ? (rideTime > todayTime ? true : false) : false)
                )) 
                {
                    rides.push(ride)
                }
            })
            // const rideDate =
            // const newDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()
            // console.log(today.getFullYear() + '-' + ("0" +(today.getMonth()+1)).slice(-2) + '-' + today.getDate())
            // console.log(rideDate < newDate)
            // console.log(rides[0].startTime.split('T')[1].split('.')[0]) 
            // console.log(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
            
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
    const chatbtn = (e) => {
        const rideId = e.target.parentNode.id
    }

    const showRides = () => {
        return (
            <div>
                {rides && rides.map((ride, key) => {
                    if( ride.seats > 0){
                        return <RideCard ride={ride} key={key} requestRide = {requestRide} chat={chatbtn}/>
                    }
                })}
            </div>
        )
    }
   

    return (
        <Base title="View rides">
            {errorMessage()}
            {showRides()}
        </Base>
    )
}
export default  ShowRides;