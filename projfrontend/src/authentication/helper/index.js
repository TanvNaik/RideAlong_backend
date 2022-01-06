import axios from "axios";
import { API } from "../../backend";

export const signup = (user)=>{

    /* return axios({
        method: "post",
        url: `${API}/signup`,
        data: user,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response)=> {
            console.log(response)
          return response
        })
        .catch( (error) => {
            console.log(error)
          return error
        }); */
        
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept : "application/json"
        },
        body: user
    })
    .then((response)=>{
        console.log(response)
        return response.json();
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
} 

export const signin = (user)=>{

    return fetch(`${API}/signin`,{
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

    return fetch(`${API}/signout`,{
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