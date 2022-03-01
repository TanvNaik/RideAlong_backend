export const getAllRides = () =>{
    return fetch(`/api/getAllRides`,{
        method: "GET"
    }).then(response => {
        return response.json();
    })
    .catch(err => err)
}

export const getAllCities = () =>{
    return fetch(`/api/getAllCities`,{
        method: "GET"
    }).then(response => response.json())
    .catch(err => err)
}

export const getRidebyId = (rideId) => {
    return fetch(`/api/ride/${rideId}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
export const createRide = (ride, userId, token) => {
    return fetch(`/api/createRide/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(ride)
    }).then( response => {
        return response.json();
    })
    .catch( err => console.log(err))
}

export const requestRideCall = (rideId, userId, token) => {
    return fetch(`/api/request-ride/${rideId}/${userId}`,{
        method: "PUT",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept: 'application/json'
        }
    }).then( response => response.json())
    .catch(err => console.log(err))
}

export const approveRideRequest = (userId, rideId, acceptId, token) => {
    return fetch(`/api/approve-passenger/${userId}/${rideId}/${acceptId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.json())
    .catch( err => console.log(err))
}
export const rejectRideRequest = (userId, rideId, rejectId, token) => {
    return fetch(`/api/reject-passenger/${userId}/${rideId}/${rejectId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.json())
    .catch( err => console.log(err))
}

export const createInvoice = (body, userId, rideId, token) => {
    return fetch(`/api/create/invoice/${rideId}/${userId}`, {
        credentials: 'include',
        method: "POST",
            headers: {
                'Content-Type': "application/json"
            
        },
     
        body: JSON.stringify(body)

    }).then( response => response.json())
    .catch(err => console.log(err))

}

export const getRideInvoices = (rideId) => {
    return fetch(`/api/invoices/${rideId}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}

export const removePassengerFromRide = (rideId, passengerId) => {
    return fetch(`/api/removePassenger/${rideId}/${passengerId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json"
        }
    }).then(response => response.json())
    .catch(err => console.log(err))
}