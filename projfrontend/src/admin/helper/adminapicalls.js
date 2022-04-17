
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