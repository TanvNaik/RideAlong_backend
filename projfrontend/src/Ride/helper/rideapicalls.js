import { API } from "../../backend"
// 25 5 25 25 15 15
export const getAllRides = () =>{
    return fetch(`${API}/getAllRides`,{
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => err)
}

export const getAllCities = () =>{
    return fetch(`${API}/getAllCities`,{
        method: "GET"
    }).then(response => response.json())
    .catch(err => err)
}

export const createRide = (ride, userId, token) => {
    return fetch(`${API}/createRide/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: ride
    }).then( response => {
        return response.json();
    })
    .catch( err => {
        return err
    })
}