import axios from "axios";
import { API } from "../../backend";


export let testRoute = ()=>{
    axios.get(`${API}/test`)
    .then(response => response)
    .catch(err => console.log(err))
}