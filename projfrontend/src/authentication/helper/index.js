
export const signup = (user)=>{
        
    return fetch(`/api/signup`, {
        method: "POST",
        headers: {
            Accept : "application/json"
        },
        body: user
    })
    .then((response)=>{
        console.log(response)
        return response.json()
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
} 

export const signin = (user)=>{

    return fetch(`/api/signin`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then((response)=>{
        return response.json();
    })
    .catch(err=>{
        return err;
    })
}

// Set token in user browwser
export const authenticate = (data,next) =>{
    //checking if code is run on browser or not
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

// Remove token from user browser
export const signout = (next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();
    }

    return fetch(`/api/signout`,{
        method: "GET"
    })
    .then(response =>  "Signout Success")
    .catch(err => err)
}

export const isAuthenticated = () =>{
    if(typeof window == "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        // returns token and user object
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}