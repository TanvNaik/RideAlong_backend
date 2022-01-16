export const addVehicle = (userId, token, vehicle) => {
    return fetch(`/api/addVehicle/user/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: vehicle
    }).then( response => response.json())
    .catch( err => console.log(err))
}
export const getUserVehicles = (userId, token) => {
    return fetch(`/api/vehicles/user/${userId}`,{
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`            
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
}

export const getUserRides = (userId) => {
    return fetch(`/api/rides/user/${userId}`,{
        headers: {
            Accept: "application/json"
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
}
export const getCityNames = (sourceId, destinationId) => {
    return fetch(`/api/city-names/${sourceId}/${destinationId}`).then(response => response.json())
    .catch(err => console.log(err)) 
}
export const getUserFeedbacks = (userId)=>{
    return fetch(`/api/feedbacks/user/${userId}`)
    .then(response => response.json())
    .catch(err=> console.log(err))
}