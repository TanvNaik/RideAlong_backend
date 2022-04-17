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

export const checkUsernameAndEmail = (obj) => {
    return fetch(`/api/checkUsernameAndEmail`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
    .catch(err => console.log(err))
}
export const getUserPayments = (userId, token) => {
    return fetch(`/api/payments/user/${userId}`)
    .then(response => response.json())
    .catch(err => console.log(err))
}
export const getUser = (findUser, token,userId) =>{
    return fetch(`/api/user/${userId}/${findUser}`,{
        method: "GET",
        headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
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

export const getUserFeedbacks = (userId)=>{
    return fetch(`/api/feedbacks/user/${userId}`)
    .then(response => response.json())
    .catch(err=> console.log(err))
}

export const writeFeedback = (userId, receiverId, token, feedback) => {
    return fetch(`/api/writeFeedback/${userId}/${receiverId}`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(feedback)
    })
}

export const updateUser = (userId, token, userobj) =>{
    return fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers:{
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:  JSON.stringify(userobj)
    })
}
export const changePassword = (obj) => {
    return fetch(`/api/${obj._id}/changePassword`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
    .catch(err => console.log(err))
}