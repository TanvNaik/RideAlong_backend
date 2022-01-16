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
    .catch( err => {
        return err
    })
}