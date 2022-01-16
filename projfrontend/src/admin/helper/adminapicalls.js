


export const addCity = (userId, token, cityData) => {
    const {cityName, cityLatitude, cityLongitude} = cityData;

    return fetch(`/api/city/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({cityName: cityName,
        cityLatitude: cityLatitude,
    cityLongitude: cityLongitude})
    }).then(response => response.json())
    .catch(err => err)

}


export const deleteCity = (cityId, token) => {
    return fetch(`/api/city/${cityId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type": "text/plain"
        }/* ,
       body: cityId */
   }).then(response => response.json())
    .catch(err => err)
}
export const showUnverifiedUsers = (userId, token) => {
    return fetch(`/api/pendingUserVerifications/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
    .catch(err => err)
}

export const verifyUsersbyId = (adminId, token, userId ) => {
    console.log(typeof(userId))
    return fetch(`/api/verify-user/${adminId}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userId) 
    })
    .then(response => response.json())
    .catch(err => err)
}