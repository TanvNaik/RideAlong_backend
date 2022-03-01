export const sendEmail = (reqobj) => {
    return fetch(`/api/send-mail`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            'Content-Type': "application/json",
        },
        body: JSON.stringify(reqobj)
    }).then(response => response.json)
    .catch(err => console.log(err))
}