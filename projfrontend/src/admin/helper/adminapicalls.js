import axios from "axios";
import { API } from "../../backend";


export const testRoute = ()=>{
    axios.get(`${API}/test`)
    .then(response => response)
    .catch(err => console.log(err))
}

export const addCity = (userId, token, cityData) => {
    const {cityName, cityLatitude, cityLongitude} = cityData;

    return axios.post(`${API}/city/${userId}`,{
        cityName, cityLatitude, cityLongitude,
    },{
        headers: {
            Accept: "application/json",
            "Content-Type": "image/*",
            Authorization: `Bearer ${token}` 
        }
    })
    .then(response => response)
    .catch(error => error.response) 
}



export const showUnverifiedUsers = (userId, token) => {
    return fetch(`${API}/pendingUserVerifications/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => err)
}